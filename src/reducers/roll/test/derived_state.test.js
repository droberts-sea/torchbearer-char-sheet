import { expectedMargin, oddsOfSuccess, skillDice } from '../derived_state';
import character from '../../../mock/character';

const fakeSummary = Object.freeze({
  type: 'obstacle',
  dice: 0,
  ob: 0,
  successes: 0,
  odds: 0,
  expected_margin: 0
});

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
      dice: 0
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
  });

  test('Adds full dice for an ability', () => {
    const abilityName = 'WILL';
    const ability = character.abilities[abilityName];

    checkRatingAdded(abilityName, ability.rating);
  });

  test('Uses nature if rolling with nature', () => {
    const nature = character.abilities['NATURE'];

    checkRatingAdded('ALCHEMIST', nature.rating, true);
  });

  test('Uses BL ability / 2 for an untrained skill', () => {
    const skillName = 'ALCHEMIST';
    const skill = character.skills[skillName];

    // Assumption: ALCHEMIST is not an open skill
    expect(skill.open).toBe(false);

    const blAbility = character.abilities[skill.beginnersLuck];
    const expectedDice = Math.ceil(blAbility.rating / 2);

    checkRatingAdded(skillName, expectedDice);
  });
});

describe('expectedMargin', () => {
  test('is 0 for twice as many dice as ob', () => {
    const summary = {
      ...fakeSummary,
      dice: 4,
      ob: 2
    };
    expect(expectedMargin(summary)).toBe(0);

    summary.dice = 6;
    summary.ob = 3;
    expect(expectedMargin(summary)).toBe(0);
  });

  test('adds .5 per die past twice ob', () => {
    const summary = {
      ...fakeSummary,
      dice: 5,
      ob: 2
    };
    expect(expectedMargin(summary)).toBe(.5);

    summary.dice = 6;
    expect(expectedMargin(summary)).toBe(1);

    summary.dice = 7;
    summary.ob = 3;
    expect(expectedMargin(summary)).toBe(.5);

    summary.dice = 8;
    expect(expectedMargin(summary)).toBe(1);
  });

  test('subtracts .5 per die below twice ob', () => {
    const summary = {
      ...fakeSummary,
      dice: 3,
      ob: 2
    };
    expect(expectedMargin(summary)).toBe(-.5);

    summary.dice = 2;
    expect(expectedMargin(summary)).toBe(-1);

    summary.dice = 5
    summary.ob = 3;
    expect(expectedMargin(summary)).toBe(-.5);

    summary.dice = 4
    expect(expectedMargin(summary)).toBe(-1);
  });

  test('accounts for positive successes', () => {
    const summary = {
      ...fakeSummary,
      dice: 4,
      ob: 2,
      successes: 1
    };
    expect(expectedMargin(summary)).toBe(1);
  });

  test('accounts for negative successes', () => {
    const summary = {
      ...fakeSummary,
      dice: 4,
      ob: 2,
      successes: -1
    };
    expect(expectedMargin(summary)).toBe(-1);
  });
});

describe('oddsOfSuccess', () => {
  test('yields 1 for ob 0', () => {
    const summary = {
      ...fakeSummary,
      dice: 4,
      ob: 0
    };
    expect(oddsOfSuccess(summary)).toBe(1);

    summary.dice = 1;
    expect(oddsOfSuccess(summary)).toBe(1);
  });

  test('yields 1 if ob - successes <= 0', () => {
    const summary = {
      ...fakeSummary,
      dice: 4,
      ob: 1,
      successes: 1
    };
    expect(oddsOfSuccess(summary)).toBe(1);

    summary.successes = 2;
    expect(oddsOfSuccess(summary)).toBe(1);
  });

  test ('yields 0 if no dice', () => {
    const summary = {
      ...fakeSummary,
      dice: 0,
      ob: 1
    };
    expect(oddsOfSuccess(summary)).toBe(0);
  });

  test('yields 0 if dice + successes <= 0', () => {
    const summary = {
      ...fakeSummary,
      dice: 1,
      ob: 1,
      successes: -1
    };
    expect(oddsOfSuccess(summary)).toBe(0);

    summary.successes = -2;
    expect(oddsOfSuccess(summary)).toBe(0);
  });

  test('yields .5 for 1 die 1 ob', () => {
    const summary = {
      ...fakeSummary,
      dice: 1,
      ob: 1
    };
    expect(oddsOfSuccess(summary)).toBe(0.5);
  });

  test('yields .25 for 2 dice 2 ob', () => {
    const summary = {
      ...fakeSummary,
      dice: 2,
      ob: 2
    };
    expect(oddsOfSuccess(summary)).toBe(.25);
  });

  test('yields .75 for 2 dice 1 ob', () => {
    const summary = {
      ...fakeSummary,
      dice: 2,
      ob: 1
    };
    expect(oddsOfSuccess(summary)).toBe(.75);
  })
});
