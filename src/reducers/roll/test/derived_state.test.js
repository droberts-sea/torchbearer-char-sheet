import { skillDice } from '../derived_state';
import character from '../../../mock/character';

describe('skillDice', () => {
  let rollState;
  let rollSummary;
  beforeEach(() => {
    rollState = {
      dice: {
        info: {
          skill: undefined
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
