import _ from 'underscore';

const postRollDerived = (rolledDice, rollSummary) => {
  const dice = rolledDice.sort(
    (a, b) => Math.sign(b.face - a.face)
  );
  const groups = _.groupBy(dice,
    d => d.face > 3 ? "successes" : "scoundrels"
  );
  const successes = groups.successes || [];
  const scoundrels = groups.scoundrels || [];

  const totalSuccesses = successes.length + rollSummary.addSuccesses;
  const outcome = totalSuccesses >= rollSummary.ob ? 'pass' : 'fail';

  return { dice, successes, scoundrels, totalSuccesses, outcome };
};

export default postRollDerived;