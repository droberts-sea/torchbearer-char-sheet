import {
  ROLL_SET_INFO,
  ROLL_SET_MODIFIER,
  ROLL_GOTO_PAGE,
  ROLL_PAGES,
  ROLL_RESET,
  ROLL_ROLL_DICE,
  ROLL_COMMIT
} from '../../actions/roll_actions';

import { traitIsAvailable } from '../../rules/traits';
import { SET_CONDITION } from '../../actions';

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
      isDisposition: true
    },

    modifiers: {
      natureInstead: false,
      tapNature: false,
      traitName: 'Jaded',
      traitEffect: undefined,
      help: 0,
      personaDice: 0,
      supplies: false,
      gear: true,
    },

    locked: false,

    
  },
  results: {
    rolledDice: [
      // { face: 3, rerolled: false }
    ],

    rerolls: {
      explodeSixes: false,
      deeperUnderstandingUsed: false,
      ofCourseUsed: false,
      fateSpent: 0,
      personaSpent: 0
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

const reduceResults = function(state, action, character) {
  switch(action.type) {
    case ROLL_ROLL_DICE:
      console.log("Rolling dice");
      break;

    default:
      return state;
  }
}

const rollReducer = function (state = InitialRoll, action, character) {
  state = {
    display: reduceDisplay(state.display, action, character),
    dice: reduceDice(state.dice, action, character),
    results: reduceResults(state.results, action, character),
  };

  return state;
}

export default rollReducer;
