import _ from 'underscore';

import {
  ROLL_SET_REACTION,
  ROLL_ROLL_DICE,
} from '../../actions/roll_actions';

import calculateDerivedRollState from '../../derivers/roll/derived_state';

const InitialResults = Object.freeze({
  rolledDice: [
    // { id: 1, face: 3, rerolled: false }
  ],

  reactions: {
    totalDiceRolled: 0,
    explodeSixes: false,
    deeperUnderstandingWise: undefined,
    deeperUnderstandingUsed: false,
    ofCourseWise: undefined,
    ofCourseUsed: false,
    fateSpent: 0,
    personaSpent: 0,
    wisesUsed: [],
    log: []
  },
});

const rollDie = (id) => {
  return {
    id: id,
    face: Math.ceil(Math.random() * 6),
    rerolled: false
  };
}

const logDiceDetails = (prelude, dice) => {
  const faces = dice.map(die => die.face);
  const successes = faces.filter(f => f > 3).length;

  let logString = prelude;
  logString += '[' + faces.sort().reverse().join(', ') + ']';
  logString += ` (${successes} successes)`;

  return logString;
}

const reduceResults = function (state = InitialResults, action, character, roll) {
  const newState = { ...state };
  switch (action.type) {
    case ROLL_ROLL_DICE:

      // This almost feels like a layering violation, but we need access to the same computed numbers
      const rollSummary = calculateDerivedRollState(roll, character).summary;

      // Is there a name for this pattern?
      const rolledDice = [];
      _.times(rollSummary.dice, (i) => {
        rolledDice.push(rollDie(i));
      });

      newState.rolledDice = rolledDice;

      // Reset reactions
      newState.reactions = { ...InitialResults.reactions };

      // Tell what happened
      const logString = logDiceDetails(`Initial roll of ${rolledDice.length} dice yielded `, rolledDice);

      newState.reactions.log = [logString];

      return newState;

    case ROLL_SET_REACTION:
      const newReactions = { ...newState.reactions };
      const { prop, value } = action.payload;
      newReactions[prop] = value;

      newState.reactions = newReactions;

      switch (prop) {
        case 'explodeSixes': {
          let nextId = state.rolledDice.length;
          const rerolls = [];
          const newRolledDice = [];

          let sixCount = 0;

          state.rolledDice.forEach(die => {
            // Make a copy, if needed, for state mgmt
            if (die.face === 6 && !die.rerolled) {
              die = { ...die };
              die.rerolled = true;
              sixCount += 1;
            }
            newRolledDice.push(die);

            while (die.face === 6) {
              die.rerolled = true;
              die = rollDie(nextId)
              rerolls.push(die);
              nextId += 1;
            }
          });

          newState.rolledDice = newRolledDice.concat(rerolls);

          const logString = logDiceDetails(`Used "Fate for Luck" to cascade-reroll ${sixCount} sixes, yielding `, rerolls);
          newState.reactions.log = state.reactions.log.concat([logString]);

          // TODO: impact - spend one fate

          break;

        }
        case 'deeperUnderstandingUsed': {
          if (!state.reactions.deeperUnderstandingWise) {
            throw new Error("Deeper understanding was used, but no wise was selected!");
          }

          let nextId = state.rolledDice.length;
          let lowDie = { face: Infinity };
          let lowDieIndex = undefined;

          state.rolledDice.forEach((die, index) => {
            if (die.face < lowDie.face) {
              lowDie = die;
              lowDieIndex = index;
            }
          });

          const newRolledDice = [...state.rolledDice];
          newRolledDice.splice(lowDieIndex, 1);
          newRolledDice.push({ ...lowDie, rerolled: true });
          const newDie = rollDie(nextId)
          newRolledDice.push(newDie);

          newState.rolledDice = newRolledDice;

          // Each wise can be used only once per roll (pg 21)
          newState.reactions.wisesUsed = state.reactions.wisesUsed.concat([state.reactions.deeperUnderstandingWise]);

          const logString = logDiceDetails(`Used "Deeper Understanding" with wise "${state.reactions.deeperUnderstandingWise}" to reroll the lowest die (value ${lowDie.face}), yielding `, [newDie]);
          newState.reactions.log = state.reactions.log.concat([logString]);

          // TODO: impact - spend one fate, mark wise used

          break;
        }
        case 'ofCourseUsed': {
          if (!state.reactions.ofCourseWise) {
            throw new Error("Of Course was used, but no wise was selected!");
          }

          let nextId = state.rolledDice.length;
          const rerolls = [];
          const newRolledDice = [];

          state.rolledDice.forEach(die => {
            // Make a copy, if needed, for state mgmt
            if (die.face < 4 && !die.rerolled) {
              die = { ...die };
              die.rerolled = true;

              const newDie = rollDie(nextId)
              rerolls.push(newDie);
              nextId += 1;
            }
            newRolledDice.push(die);
          });

          newState.rolledDice = newRolledDice.concat(rerolls);

          // Each wise can be used only once per roll (pg 21)
          newState.reactions.wisesUsed = state.reactions.wisesUsed.concat([state.reactions.ofCourseWise]);

          const logString = logDiceDetails(`Used "Of Course" with wise "${state.reactions.ofCourseWise}" to reroll ${rerolls.length} failures, yielding `, rerolls);
          newState.reactions.log = state.reactions.log.concat([logString]);

          // TODO impact - spend one persona, mark wise used

          break;

        }
        default: {
          break;
        }
      }

      return newState;

    default:
      return state;
  }
}

export default reduceResults;