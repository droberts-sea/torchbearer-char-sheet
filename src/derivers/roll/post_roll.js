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

  let totalSuccesses = successes.length + rollSummary.addSuccesses;

  
  // Note: 'pass' and 'fail' are used as keywords elsewhere
  const outcome = totalSuccesses >= rollSummary.ob ? 'pass' : 'fail';

  if (outcome === 'pass') {
    totalSuccesses += rollSummary.conditionalSuccesses;
  }

  const margin = Math.abs(rollSummary.ob - totalSuccesses);
  
  return { dice, successes, scoundrels, ob: rollSummary.ob, totalSuccesses, outcome, margin };
};

export default postRollDerived;