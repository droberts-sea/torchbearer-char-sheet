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
          natureInstead: false
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
      const expectedDice = blAbility.rating;

      checkRatingAdded(skillName, expectedDice);
      expect(rollSummary.isBeginnersLuck).toBe(true);
    });
  });

  describe("Modifiers", () => {
    // Test on a trained skill (untrained is below)
    let skillName = 'ORATOR';
    beforeAll(() => {
      expect(character.skills[skillName].open).toBe(true);
    });

    const checkModifierAdded = ({
      modName,
      detailsText,
      beforeSetting=false,
      afterSetting=true,
      expectedDiceAdded=1
    }) => {

      rollState.dice.info.skill = skillName;

      // Calculate state without this modifier
      rollState.dice.modifiers[modName] = beforeSetting;
      const beforeState = calculateDerivedRollState(rollState, character);

      expect(
        _.some(beforeState.details, (detail) => {
          return detail.source.includes(detailsText);
        })
      ).toBe(false);

      // Calculate state with this modifier
      rollState.dice.modifiers[modName] = afterSetting;
      const afterState = calculateDerivedRollState(rollState, character);

      const expectedDice = beforeState.summary.dice + expectedDiceAdded;
      expect(afterState.summary.dice).toBe(expectedDice);

      expect(
        _.some(afterState.details, (detail) => {
          return detail.source.includes(detailsText);
        })
      ).toBe(true);
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

    test("supplies", () => {
      checkModifierAdded({
        modName: 'gear',
        detailsText: 'No Gear',
        beforeSetting: true,
        afterSetting: false,
        expectedDiceAdded: -1
      });
    });
  });

  describe("Beginner's Luck", () => {
    let blSkillName = 'ALCHEMIST';
    let trainedSkillName = 'ORATOR';
    beforeAll(() => {
      expect(character.skills[blSkillName].open).toBe(false);
      expect(character.skills[trainedSkillName].open).toBe(true);
    });

    describe("Affected by BL", () => {
      test.skip("wises", () => {

      });

      test("help", () => {
        const skill = character.skills[blSkillName];
        const helpDice = 4;

        rollState.dice.info.skill = blSkillName;
        rollState.dice.modifiers.help = 0;

        const beforeState = calculateDerivedRollState(rollState, character);

        rollState.dice.modifiers.help = helpDice;

        const afterState = calculateDerivedRollState(rollState, character);

        const expectedDice = beforeState.summary.dice + helpDice / 2;
        expect(afterState.summary.dice).toBe(expectedDice);
      })
    });

    describe("Not affected by BL", () => {

    });
  });
});
