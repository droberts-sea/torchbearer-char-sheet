import { sum, combinations } from 'mathjs';
import _ from 'underscore';

export const expectedMargin = function(summary) {
  const expected_success = (summary.dice / 2.0) + summary.addSuccesses;
  let expected_bar;
  if (summary.type === 'versus') {
    expected_bar = summary.ob / 2;
  } else {
    expected_bar = summary.ob;
  }
  return expected_success - expected_bar;
}

export const oddsOfSuccess = function(summary) {
  if (summary.type === 'versus') {
    // TODO: versus tests - competing bernoulli processes
    return NaN;
  }

  if (summary.ob - summary.addSuccesses <= 0) {
    return 1;
  }

  // Sum from i=ob to number of dice d of
  //   (d choose i) * .5^i * .5^(d-i)
  const dice = summary.dice;
  const base = summary.ob - summary.addSuccesses;
  return sum(_.times(1 + dice - base, (j) => {
    const i = j + base;
    return combinations(dice, i) * (.5 ** i) * (.5 ** (dice-i));
  }));
}

const diceMath = function(state, character, summary) {
  summary.expectedMargin = expectedMargin(summary);
  summary.odds = oddsOfSuccess(summary);
}

export default diceMath;
