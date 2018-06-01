import { expectedMargin, oddsOfSuccess } from '../dice_math';

const fakeSummary = Object.freeze({
  type: 'obstacle',
  dice: 0,
  ob: 0,
  successes: 0,
  odds: 0,
  expected_margin: 0
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
