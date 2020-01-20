import _ from 'underscore';

import { skillDice, calculateDerivedRollState } from '../derived_state';
import character from '../../../mock/character';

describe('Derived State', () => {
  let rollState;
  let rollSummary;
  beforeEach(() => {
    rollState = {
      dice: {
        info: {
          skill: undefined,
          ob: 3
        },
        modifiers: {
          natureInstead: false,
          gear: true // gear is on by default
        }
      }
    };

    rollSummary = {
      dice: 0,
      isBeginnersLuck: false,
    }
  });

  describe('skillDice', () => {


    const checkRatingAdded = (skillName, expectedDice, natureInstead=false) => {
      rollState.dice.info.skill = skillName;
      rollState.dice.modifiers.natureInstead = natureInstead;

      const details = [];
      skillDice(rollState, character, rollSummary, details);

      expect(rollSummary.dice).toBe(expectedDice);
      expect(details.length).toBe(1);
    }

    test('Adds full dice for a trained skill', () => {
      const skillName = 'ORATOR';
      const skill = character.skills[skillName];

      // Assumption: ORATOR is an open skill
      expect(skill.open).toBe(true);

      checkRatingAdded(skillName, skill.rating);
      expect(rollSummary.isBeginnersLuck).toBe(false);
    });

    test('Adds full dice for an ability', () => {
      const abilityName = 'WILL';
      const ability = character.abilities[abilityName];

      checkRatingAdded(abilityName, ability.rating);
      expect(rollSummary.isBeginnersLuck).toBe(false);
    });

    test('Uses nature if rolling with nature', () => {
      const nature = character.abilities['NATURE'];

      checkRatingAdded('ALCHEMIST', nature.rating, true);
      expect(rollSummary.isBeginnersLuck).toBe(false);
    });

    test('Uses BL ability and sets isBeginnersLuck for an untrained skill', () => {
      const skillName = 'ALCHEMIST';
      const skill = character.skills[skillName];

      // Assumption: ALCHEMIST is not an open skill
      expect(skill.open).toBe(false);

      const blAbility = character.abilities[skill.beginnersLuck];

      // Note: we don't divide by 2 b/c the skillDice function tested here happens before the BL division
      // ugh testing private functions
      const expectedDice = blAbility.rating;

      checkRatingAdded(skillName, expectedDice);
      expect(rollSummary.isBeginnersLuck).toBe(true);
    });
  });

  describe("Modifiers", () => {
    // Test on a trained skill (untrained is below)
    const trainedSkillName = 'ORATOR';
    beforeAll(() => {
      expect(character.skills[trainedSkillName].open).toBe(true);
    });

    const rollWithoutAndWithModifier = (
      modName,
      beforeSetting,
      afterSetting,
      skillName
    ) => {
      rollState.dice.info.skill = skillName;

      // Calculate state without this modifier
      rollState.dice.modifiers[modName] = beforeSetting;
      const beforeState = calculateDerivedRollState(rollState, character);

      // Calculate state with this modifier
      rollState.dice.modifiers[modName] = afterSetting;
      const afterState = calculateDerivedRollState(rollState, character);

      return [beforeState, afterState];
    }

    const checkModifierAdded = ({
      modName,
      detailsText,
      beforeSetting=false,
      afterSetting=true,
      expectedDiceAdded=1,
      skillName=trainedSkillName
    }) => {
      const [beforeState, afterState] = rollWithoutAndWithModifier(modName, beforeSetting, afterSetting, skillName);

      expect(
        _.some(beforeState.details, (detail) => {
          return detail.source.includes(detailsText);
        })
      ).toBe(false);

      expect(
        _.some(afterState.details, (detail) => {
          return detail.source.includes(detailsText);
        })
      ).toBe(true);

      const expectedDice = beforeState.summary.dice + expectedDiceAdded;
      expect(afterState.summary.dice).toBe(expectedDice);
    }

    const checkModifierNotAdded = ({
      modName,
      detailsText,
      beforeSetting=false,
      afterSetting=true,
      skillName=trainedSkillName
    }) => {
      const [beforeState, afterState] = rollWithoutAndWithModifier(modName, beforeSetting, afterSetting, skillName);

      expect(
        _.some(beforeState.details, (detail) => {
          return detail.source.includes(detailsText);
        })
      ).toBe(false);

      expect(
        _.some(afterState.details, (detail) => {
          return detail.source.includes(detailsText);
        })
      ).toBe(false);

      expect(afterState.summary.dice).toBe(beforeState.summary.dice);
    }

    test("help", () => {
      const helpDice = 4;

      checkModifierAdded({
        modName: 'help',
        detailsText: 'Help',
        beforeSetting: 0,
        afterSetting: helpDice,
        expectedDiceAdded: helpDice
      });
    });

    test("supplies", () => {
      checkModifierAdded({
        modName: 'supplies',
        detailsText: 'Supplies'
      });
    });

    test("gear", () => {
      checkModifierAdded({
        modName: 'gear',
        detailsText: 'No Gear',
        beforeSetting: true,
        afterSetting: false,
        expectedDiceAdded: -1
      });
    });

    test("persona dice", () => {
      checkModifierAdded({
        modName: 'personaDice',
        detailsText: 'Persona dice',
        beforeSetting: 0,
        afterSetting: 3,
        expectedDiceAdded: 3
      });
    });

    test("tap nature", () => {
      checkModifierAdded({
        modName: 'tapNature',
        detailsText: 'Tapping nature',
        expectedDiceAdded: character.abilities.NATURE.rating
      });

      // Doesn't apply to resources or circles
      checkModifierNotAdded({
        modName: 'tapNature',
        detailsText: 'Tapping nature',
        skillName: 'RESOURCES'
      });
      checkModifierNotAdded({
        modName: 'tapNature',
        detailsText: 'Tapping nature',
        skillName: 'CIRCLES'
      });
    });
  });

  describe("Beginner's Luck", () => {
    const blSkillName = 'ALCHEMIST';
    const blAbilityName = character.skills[blSkillName].beginnersLuck;
    const blAbilityRating = character.abilities[blAbilityName].rating;

    const trainedSkillName = 'ORATOR';
    beforeAll(() => {
      expect(character.skills[blSkillName].open).toBe(false);
      expect(character.skills[trainedSkillName].open).toBe(true);
    });

    describe("Affected by BL", () => {
      test("ability", () => {
        // using the relevant ability instead of the skill
        // should also divide by 2
        rollState.dice.info.skill = blSkillName;
        
        const afterState = calculateDerivedRollState(rollState, character);
        
        const expectedDice = Math.ceil(blAbilityRating / 2);

        expect(afterState.summary.dice).toBe(expectedDice);
      });

      test("help", () => {
        const helpDice = 4;

        rollState.dice.info.skill = blSkillName;
        rollState.dice.modifiers.help = 0;

        const beforeState = calculateDerivedRollState(rollState, character);

        rollState.dice.modifiers.help = helpDice;

        const afterState = calculateDerivedRollState(rollState, character);

        const expectedDice = beforeState.summary.dice + helpDice / 2;
        expect(afterState.summary.dice).toBe(expectedDice);
      });
      
      test("supplies and gear", () => {
        // This one is tricky!
        // I don't want the individual test to depend heavily on the data. However, the affect of adding one die does depend on how many dice were already there, because the total is divided by 2 and rounded up.
        // In other words, adding 1D may or may not change the total.
        // Here we use help and gear modifiers together to pad, and check both sides of the corner case. Ugly but functional.
        rollState.dice.info.skill = blSkillName;
        rollState.dice.modifiers.gear = false;
        rollState.dice.modifiers.supplies = false;

        const beforeState = calculateDerivedRollState(rollState, character);

        // Assumption: the only thing that applies is the ability and the lack of gear
        expect(beforeState.summary.dice).toBe(Math.ceil((blAbilityRating - 1) / 2));

        // Just supplies
        rollState.dice.modifiers.supplies = true;
        rollState.dice.modifiers.gear = false;

        const withSuppliesState = calculateDerivedRollState(rollState, character);

        let expectedDice = beforeState.summary.dice;
        if (blAbilityRating % 2 == 1) {
          expectedDice += 1;
        }
        expect(withSuppliesState.summary.dice).toBe(expectedDice);

        // Just gear
        rollState.dice.modifiers.supplies = false;
        rollState.dice.modifiers.gear = true;

        const withGearState = calculateDerivedRollState(rollState, character);
        expect(withGearState.summary.dice).toBe(expectedDice);

        // Both supplies and gear
        rollState.dice.modifiers.supplies = true;
        rollState.dice.modifiers.gear = true;

        const withSuppliesAndGearState = calculateDerivedRollState(rollState, character);

        expectedDice = beforeState.summary.dice + 1;
        expect(withSuppliesAndGearState.summary.dice).toBe(expectedDice);
      });

      test.skip("conditions", () => {
        // injured and sick subtract dice
        // h&t subtracts 1 only on dispo
        // afriad -> can't use BL at all
      });
      test.skip("Use nature instead", () => {
        // use nature, no bl
      })
    });

    describe("Not affected by BL", () => {
      test.skip("traits", () => {});
      test("persona points", () => {
        const personaDice = 3;
        rollState.dice.info.skill = blSkillName;
        rollState.dice.modifiers.personaDice = 0;

        const beforeState = calculateDerivedRollState(rollState, character);

        rollState.dice.modifiers.personaDice = personaDice;

        const afterState = calculateDerivedRollState(rollState, character);

        const expectedDice = beforeState.summary.dice + personaDice;
        expect(afterState.summary.dice).toBe(expectedDice);
      });
      test.skip("tapped nature", () => {});
      test.skip("conditions", () => {
        // fresh adds a die after
        // h&t, exhausted should not impact
      });
    });
  });
});
