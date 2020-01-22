import {
  ROLL_SET_INFO,
  ROLL_SET_MODIFIER,
  ROLL_GOTO_PAGE,
  ROLL_PAGES
} from '../../actions/roll_actions';

import calculateDerivedRollState from './derived_state';

import { traitIsAvailable } from '../../rules/traits';

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
  const {prop, value} = action.payload;
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

const reduceModifiers = function (state, action, character) {
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
        // Toggle gear based on beginner's luck
        // TODO: default to false if no backpack (pg 34)
        // TODO: exception for dwarves (always have tools if have backpack - pg 34)
        newState = { ...state };
        skill = character.skills[action.payload.value];
        if (skill && !skill.open && !state.natureInstead) {
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
    // falls through

    default:
      return state;
  }
}

const reduceDice = function (state, action, character) {
  return {
    ...state,
    info: reduceInfo(state.info, action, character),
    modifiers: reduceModifiers(state.modifiers, action, character)
  };
};

const rollReducer = function (state = InitialRoll, action, character) {
  state = {
    display: reduceDisplay(state.display, action, character),
    dice: reduceDice(state.dice, action, character),
  }

  // BUG: because this looks at the old character state rather than having diret access to the action, changes to the character take an extra reduce cycle to show up in the derived roll state. Fortunately you can't edit the character from the roll page, which means there's always at least one more action (switch to the roll page) before any derived state is visible.
  // Two fixes could work:
  // - pass in the _new_ global state and character info instead of the old (this violates the principle that reducers are independent, and probably is bad for other theoretical reasons)
  // - have the derived state reducer respond independently to all actions, which would be a GIANT pain in the rear
  // or we just leave it, and say "it's probably fine"
  state.derived = calculateDerivedRollState(state, character);
  return state;
}

export default rollReducer;
