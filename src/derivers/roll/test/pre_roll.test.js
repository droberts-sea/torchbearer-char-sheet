import _ from 'underscore';

import { skillDice, preRollDerived } from '../pre_roll';
import character from '../../../mock/character';

describe('Pre Roll Derived', () => {
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


    const checkRatingAdded = (skillName, expectedDice, natureInstead = false) => {
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

    const rollWithoutAndWithModifier = ({
      modName,
      beforeSetting = false,
      afterSetting = true,
      skillName = trainedSkillName
    }) => {
      rollState.dice.info.skill = skillName;

      // Calculate state without this modifier
      rollState.dice.modifiers[modName] = beforeSetting;
      const beforeState = preRollDerived(rollState, character);

      // Calculate state with this modifier
      rollState.dice.modifiers[modName] = afterSetting;
      const afterState = preRollDerived(rollState, character);

      return [beforeState, afterState];
    }

    const checkModifierAdded = ({
      beforeState,
      afterState,
      detailsText,
      effectType='dice',
      expectedDelta=1
    }) => {
      const expectedEffect = beforeState.summary[effectType] + expectedDelta;
      expect(afterState.summary[effectType]).toBe(expectedEffect);

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
    }

    const checkModifierNotAdded = ({
      beforeState,
      afterState,
      detailsText,
      effectType="dice"
    }) => {
      expect(afterState.summary[effectType]).toBe(beforeState.summary[effectType]);

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
    }

    test("help", () => {
      const helpDice = 4;

      const [beforeState, afterState] = rollWithoutAndWithModifier({
        modName: 'help',
        beforeSetting: 0,
        afterSetting: helpDice
      });

      checkModifierAdded({
        beforeState,
        afterState,
        detailsText: 'Help',
        expectedDelta: helpDice
      });
    });

    test("supplies", () => {
      const [beforeState, afterState] = rollWithoutAndWithModifier({
        modName: 'supplies'
      });

      checkModifierAdded({
        beforeState,
        afterState,
        detailsText:'Supplies'
      });
    });

    test("gear", () => {
      const [beforeState, afterState] = rollWithoutAndWithModifier({
        modName: 'gear',
        beforeSetting: true,
        afterSetting: false
      });

      checkModifierAdded({
        beforeState,
        afterState,
        detailsText:'Gear',
        expectedDelta: -1
      });
    });

    test("persona dice", () => {
      const [beforeState, afterState] = rollWithoutAndWithModifier({
        modName: 'personaDice',
        beforeSetting: 0,
        afterSetting: 3,
      });

      checkModifierAdded({
        beforeState,
        afterState,
        detailsText: 'Persona dice',
        expectedDelta: 3
      });
    });

    test("tap nature", () => {
      const [beforeState, afterState] = rollWithoutAndWithModifier({
        modName: 'tapNature',
      });

      checkModifierAdded({
        beforeState,
        afterState,
        detailsText: 'tapping nature',
        expectedDelta: character.abilities.NATURE.rating
      });
    });

    test('tap nature resources', () => {
      // Doesn't apply to resources or circles
      const [beforeState, afterState] = rollWithoutAndWithModifier({
        modName: 'tapNature',
        skillName: 'RESOURCES'
      });

      checkModifierNotAdded({
        beforeState,
        afterState,
        detailsText: 'Tapping nature'
      });
    });
      
    test('tap nature circles', () => {
      const [beforeState, afterState] = rollWithoutAndWithModifier({
        modName: 'tapNature',
        skillName: 'CIRCLES'
      });

      checkModifierNotAdded({
        beforeState,
        afterState,
        detailsText: 'Tapping nature'
      });
    });

    test('order of might', () => {
      const [beforeState, afterState] = rollWithoutAndWithModifier({
        modName: 'orderOfMight',
        beforeSetting: 0,
        afterSetting: 1,
      });

      checkModifierAdded({
        beforeState,
        afterState,
        detailsText: 'Order of Might',
        effectType: 'conditionalSuccesses',
      });
    });

    describe("traits", () => {
      const rollWithoutAndWithTrait = ({
        traitName,
        traitEffect,
        skillName=trainedSkillName,
        isVersus=false
      }) => {
        rollState.dice.info.skill = skillName;
        rollState.dice.info.isVersus = isVersus;

        // Calculate state without this modifier
        rollState.dice.modifiers.traitName = undefined;
        rollState.dice.modifiers.traitEffect = undefined;
        const beforeState = preRollDerived(rollState, character);

        // Calculate state with this modifier
        rollState.dice.modifiers.traitName = traitName;
        rollState.dice.modifiers.traitEffect = traitEffect;
        const afterState = preRollDerived(rollState, character);

        return [beforeState, afterState];
      };

      test('beneficial trait at lv1 adds 1D', () => {
        const traitName = 'Firey';
        expect(character.traits.find(trait => trait.name == traitName).level).toBe(1);
        const [beforeState, afterState] = rollWithoutAndWithTrait({
          traitName,
          traitEffect: 'benefit'
        });
        checkModifierAdded({
          beforeState, afterState,
          detailsText: `${traitName} trait (benefit)`
        });
      });

      test('beneficial trait at lv2 adds 1D', () => {
        const traitName = 'Jaded';
        expect(character.traits.find(trait => trait.name == traitName).level).toBe(2);
        const [beforeState, afterState] = rollWithoutAndWithTrait({
          traitName,
          traitEffect: 'benefit'
        });
        checkModifierAdded({
          beforeState, afterState,
          detailsText: `${traitName} trait (benefit)`
        });
      });

      test('beneficial trait at lv3 adds 1S', () => {
        const traitName = 'Curious';
        expect(character.traits.find(trait => trait.name == traitName).level).toBe(3);
        const [beforeState, afterState] = rollWithoutAndWithTrait({
          traitName,
          traitEffect: 'benefit'
        });
        checkModifierAdded({
          beforeState, afterState,
          detailsText: `${traitName} trait (benefit)`,
          effectType: 'addSuccesses'
        });
      });

      test('penalty trait subtracts 1D', () => {
        const traitName = 'Firey';
        const [beforeState, afterState] = rollWithoutAndWithTrait({
          traitName,
          traitEffect: 'penalty'
        });
        checkModifierAdded({
          beforeState, afterState,
          expectedDelta: -1,
          detailsText: `${traitName} trait (penalty)`
        });
      });

      test('opponent trait adds 2D to opponent roll', () => {
        const traitName = 'Firey';
        const [beforeState, afterState] = rollWithoutAndWithTrait({
          traitName,
          isVersus: true,
          traitEffect: 'opponent'
        });
        checkModifierAdded({
          beforeState, afterState,
          effectType: 'opponentDice',
          expectedDelta: 2,
          detailsText: `${traitName} trait (aid opponent)`
        });
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

        const afterState = preRollDerived(rollState, character);

        const expectedDice = Math.ceil(blAbilityRating / 2);

        expect(afterState.summary.dice).toBe(expectedDice);
      });

      test("help", () => {
        const helpDice = 4;

        rollState.dice.info.skill = blSkillName;
        rollState.dice.modifiers.help = 0;

        const beforeState = preRollDerived(rollState, character);

        rollState.dice.modifiers.help = helpDice;

        const afterState = preRollDerived(rollState, character);

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

        const beforeState = preRollDerived(rollState, character);

        // Assumption: the only thing that applies is the ability and the lack of gear
        expect(beforeState.summary.dice).toBe(Math.ceil((blAbilityRating - 1) / 2));

        // Just supplies
        rollState.dice.modifiers.supplies = true;
        rollState.dice.modifiers.gear = false;

        const withSuppliesState = preRollDerived(rollState, character);

        let expectedDice = beforeState.summary.dice;
        if (blAbilityRating % 2 == 1) {
          expectedDice += 1;
        }
        expect(withSuppliesState.summary.dice).toBe(expectedDice);

        // Just gear
        rollState.dice.modifiers.supplies = false;
        rollState.dice.modifiers.gear = true;

        const withGearState = preRollDerived(rollState, character);
        expect(withGearState.summary.dice).toBe(expectedDice);

        // Both supplies and gear
        rollState.dice.modifiers.supplies = true;
        rollState.dice.modifiers.gear = true;

        const withSuppliesAndGearState = preRollDerived(rollState, character);

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
      test.skip("traits", () => { });
      test("persona points", () => {
        const personaDice = 3;
        rollState.dice.info.skill = blSkillName;
        rollState.dice.modifiers.personaDice = 0;

        const beforeState = preRollDerived(rollState, character);

        rollState.dice.modifiers.personaDice = personaDice;

        const afterState = preRollDerived(rollState, character);

        const expectedDice = beforeState.summary.dice + personaDice;
        expect(afterState.summary.dice).toBe(expectedDice);
      });
      test.skip("tapped nature", () => { });
      test.skip("conditions", () => {
        // fresh adds a die after
        // h&t, exhausted should not impact
      });
    });
  });
});
