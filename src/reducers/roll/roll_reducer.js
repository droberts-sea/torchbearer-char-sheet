import {
  ROLL_SET_PROPERTY,
  ROLL_GOTO_PAGE,
  ROLL_PAGES
} from '../../actions/roll_actions';

import calculateDerivedRollState from './derived_state';

const InitialRoll = {
  display: {
    currentPage: ROLL_PAGES[0],

    back: {
      target: undefined,
      enabled: false
    },

    forward: {
      target: 'ADD DICE',
      enabled: true
    }
  },
  dice: {
    info: {
      isVersus: false,
      skill: undefined,
      ob: 3,
      inNature: false,
      isInstinct: false,
      isRecovery: false,
      isDisposition: false
    },

    modifiers: {
      natureInstead: false,
      tapNature: false,
      trait: {
        name: undefined,
        checks: 0
      },
      help: 0,
      addThroughPersona: 0
    },

    locked: false,

    rolledDice: [
      // { face: 3, rerolled: false }
    ],

    rerolls: {
      explodeSixes: false,
      ofCourseUsed: false,
      fateSpent: 0,
      personaSpent: 0
    }
  }
};

const reduceDisplay = function(state, action, character) {
  switch(action.type) {
    case ROLL_GOTO_PAGE:
    const pageIndex = ROLL_PAGES.indexOf(action.payload.page);
    return {
      ...state,
      currentPage: action.payload.page,
      back: {
        target: ROLL_PAGES[pageIndex-1],
        // TODO some transitions have extra reqs
        enabled: !!ROLL_PAGES[pageIndex-1]
      },
      forward: {
        target: ROLL_PAGES[pageIndex+1],
        // TODO some transitions have extra reqs
        enabled: !!ROLL_PAGES[pageIndex+1]
      }
    };

    default:
    return state;
  }
};

const reduceInfo = function(state, action, character) {
  switch(action.type) {
    case ROLL_SET_PROPERTY:
    const newState = {...state};
    newState[action.payload.prop] = action.payload.value;
    return newState;

    default:
    return state;
  }
}

const reduceDice = function(state, action, character) {
  return {
    ...state,
    info: reduceInfo(state.info, action, character)
  }
};



const rollReducer = function(state=InitialRoll, action, character) {
  state = {
    display: reduceDisplay(state.display, action, character),
    dice: reduceDice(state.dice, action, character),
  }
  state.derived = calculateDerivedRollState(state, character);
  return state;
}

export default rollReducer;
