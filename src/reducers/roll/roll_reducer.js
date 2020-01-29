import _ from 'underscore';

import {
  ROLL_SET_INFO,
  ROLL_SET_MODIFIER,
  ROLL_SET_REACTION,
  ROLL_GOTO_PAGE,
  ROLL_PAGES,
  ROLL_RESET,
  ROLL_ROLL_DICE,
  ROLL_COMMIT
} from '../../actions/roll_actions';

import { traitIsAvailable } from '../../rules/traits';
import { SET_CONDITION } from '../../actions';
import calculateDerivedRollState from '../../derivers/roll/derived_state';

const InitialRoll = {
  display: {
    currentPage: ROLL_PAGES[2],

    back: {
      target: undefined,
      enabled: false
    },

    forward: {
      target: 'RESULTS',
      enabled: true
    }
  },
  dice: {
    info: {
      isVersus: false,
      skill: 'WILL',
      ob: 3,
      inNature: false,
      isInstinct: false,
      isRecovery: false,
      isDisposition: true
    },

    modifiers: {
      natureInstead: false,
      tapNature: false,
      traitName: 'Jaded',
      traitEffect: undefined,
      help: 3,
      personaDice: 0,
      supplies: false,
      gear: true,
    },

    locked: false,


  },
  results: {
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
  }
};

const reduceDisplay = function (state, action, character) {
  let pageIndex;
  switch (action.type) {
    case ROLL_GOTO_PAGE:
      pageIndex = ROLL_PAGES.indexOf(action.payload.page);
      return {
        ...state,
        currentPage: action.payload.page,
        back: {
          target: ROLL_PAGES[pageIndex - 1],
          // TODO some transitions have extra reqs
          enabled: !!ROLL_PAGES[pageIndex - 1]
        },
        forward: {
          target: ROLL_PAGES[pageIndex + 1],
          // TODO some transitions have extra reqs
          enabled: !!ROLL_PAGES[pageIndex + 1]
        }
      };

    default:
      return state;
  }
};

const reduceInfo = function (state, action, character) {
  switch (action.type) {
    case ROLL_SET_INFO:
      const newState = { ...state };
      newState[action.payload.prop] = action.payload.value;
      return newState;

    default:
      return state;
  }
};

const reduceTrait = function (state, action, character) {
  const { prop, value } = action.payload;
  const newState = { ...state };

  // special case: resetting the trait dropdown
  if (prop === 'traitName' && value === 'none') {
    newState.traitName = undefined;
    newState.traitEffect = undefined;

    // special case: switch to a trait where the benefit is unavailable
  } else if (prop === 'traitName' && state.traitEffect === 'benefit') {
    newState.traitName = value;
    const trait = character.traits.find(trait => trait.name === value);
    if (!traitIsAvailable(trait)) {
      newState.traitEffect = undefined;
    }

    // special case: un-click a trait selection
  } else if (prop === 'traitEffect' && value === state.traitEffect) {
    newState.traitEffect = undefined;

  } else {
    newState[prop] = value;
  }

  return newState;
}

const reduceModifiers = function (state, action, character, rollInfo) {
  let newState;
  let skill;
  switch (action.type) {
    case ROLL_SET_MODIFIER:

      if (action.payload.prop === 'traitName' || action.payload.prop === 'traitEffect') {
        newState = reduceTrait(state, action, character);
      } else {
        newState = { ...state };
        newState[action.payload.prop] = action.payload.value;
      }

      return newState;

    case ROLL_SET_INFO:
      // Special cases where the modifiers change when the basic roll info changes
      if (action.payload.prop === 'skill') {
        newState = { ...state };
        skill = character.skills[action.payload.value];
        if (!skill) {
          return newState;
        }

        // Can't use BL when Afraid - must roll w/ nature instead
        if (!skill.open && character.conditions.AFRAID) {
          newState.natureInstead = true;
        }

        // Toggle gear based on beginner's luck
        // TODO: default to false if no backpack (pg 34)
        // TODO: exception for dwarves (always have tools if have backpack - pg 34)
        if (!skill.open && !newState.natureInstead) {
          newState.gear = false;
        } else {
          newState.gear = true;
        }

        return newState;

      } else if (action.payload.prop === 'isVersus') {
        if (state.traitEffect === 'opponent') {
          newState = { ...state };
          newState.traitEffect = undefined;
          return newState;
        }
      }
      return state;

    case SET_CONDITION:
      // Whether or not you can use beginner's luck or are forced to use Nature is affected by the afraid condition, so we have to listen for when that changes.
      if (action.payload.condition === 'AFRAID' && action.payload.isActive) {
        skill = character.skills[rollInfo.skill];
        if (skill && !skill.open) {
          newState = { ...state };
          newState.natureInstead = true;
          return newState;
        }
      }
      return state;

    default:
      return state;
  }
}

const reduceDice = function (state, action, character) {
  return {
    ...state,
    info: reduceInfo(state.info, action, character),
    modifiers: reduceModifiers(state.modifiers, action, character, state.info)
  };
};

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

const reduceResults = function (state, action, character, roll) {
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
      newState.reactions = { ...InitialRoll.results.reactions };

      // Tell what happened
      let logString = logDiceDetails(`Initial roll of ${rolledDice.length} dice yielded `, rolledDice);

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

          const sortedRerolls = rerolls.map(die => die.face).sort().reverse();
          let logString = logDiceDetails(`Used "Fate for Luck" to cascade-reroll ${sixCount} sixes, yielding `, rerolls);
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
          const newDie = { ...lowDie, rerolled: true }
          newRolledDice.push(newDie);
          newRolledDice.push(rollDie(nextId));

          newState.rolledDice = newRolledDice;

          // Each wise can be used only once per roll (pg 21)
          newState.reactions.wisesUsed = state.reactions.wisesUsed.concat([state.reactions.deeperUnderstandingWise]);

          // TODO: impact - spend one fate, mark wise used

          break;
        }
        case 'ofCourseUsed': {
          let nextId = state.rolledDice.length;
          const rerolls = [];
          const newRolledDice = [];

          state.rolledDice.forEach(die => {
            // Make a copy, if needed, for state mgmt
            if (die.face < 4 && !die.rerolled) {
              die = { ...die };
              die.rerolled = true;

              const newDie = rollDie(nextId)
              rerolls.push(die);
              nextId += 1;
            }
            newRolledDice.push(die);
          });

          newState.rolledDice = newRolledDice.concat(rerolls);
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

const rollReducer = function (state = InitialRoll, action, character) {
  state = {
    display: reduceDisplay(state.display, action, character),
    dice: reduceDice(state.dice, action, character),
    results: reduceResults(state.results, action, character, state),
  };

  return state;
}

export default rollReducer;
