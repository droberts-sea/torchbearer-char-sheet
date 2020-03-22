import {
  ROLL_SET_INFO,
  ROLL_SET_MODIFIER,
  ROLL_GOTO_PAGE,
  ROLL_PAGES,
  ROLL_RESET,
  ROLL_ROLL_DICE,
  ROLL_ACCEPT,
  ROLL_SET_OUTCOME,
  ROLL_SET_WISE_ADVANCEMENT,
  ROLL_COMMIT_RESULTS,
} from '../../actions/roll_actions';

import { traitIsAvailable } from '../../rules/traits';
import { SET_CONDITION } from '../../actions';

import reduceResults from './results_reducer';
import { skillIsOpen } from '../../rules/skills';

// Transitions between stages are controlled by big buttons, not the nav arrows. Naving to a stage that hasn't begun is impossible. Previous stages are visible but can't interact.
export const ROLL_STAGES = {
  PRE_ROLL: 'PRE_ROLL', // gather info, add dice, ready
  REACT: 'REACT', // results
  OUTCOME: 'OUTCOME', // aftermath
};

export const InitialRoll = {
  stage: ROLL_STAGES.PRE_ROLL,
  pageIndex: 0,
  impactApplied: false,
  dice: {
    info: {
      isVersus: false,
      skill: undefined,
      ob: 3,
      inNature: false,
      isInstinct: false,
      isRecovery: false,
      isDisposition: false,
    },

    modifiers: {
      natureInstead: false,
      tapNature: false,
      traitName: undefined,
      traitEffect: undefined,
      help: 0,
      personaDice: 0,
      supplies: false,
      gear: true,
      orderOfMight: 0,
    },
  },
  // results: {
  //   rolledDice: [],
  //   reactions: {},
  // },
  outcome: {
    skillAlreadyTested: false,
    wiseAdvancement: [],
    natureDepletion: {},
  },
};

const InitialWiseAdvancement = Object.freeze({
  name: undefined,
  selectedPerk: undefined,
  newWiseName: '',
  selectedSkill: undefined,
  mark: undefined,
});

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
        if (!skillIsOpen(skill) && character.conditions.AFRAID) {
          newState.natureInstead = true;
        }

        // Toggle gear based on beginner's luck
        // TODO: default to false if no backpack (pg 34)
        // TODO: exception for dwarves (always have tools if have backpack - pg 34)
        if (!skillIsOpen(skill) && !newState.natureInstead) {
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
        if (skill && !skillIsOpen(skill)) {
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
  if (action.type === ROLL_RESET) {
    return InitialRoll.dice;
  } else {
    return {
      ...state,
      info: reduceInfo(state.info, action, character),
      modifiers: reduceModifiers(state.modifiers, action, character, state.info)
    };
  }
};

const reduceOutcome = (state, action) => {
  switch (action.type) {
    case ROLL_ACCEPT: {
      const newState = { ...state };
      newState.wiseAdvancement = action.payload.wises
        .filter(w => w.advance)
        .map(wise => ({
          ...InitialWiseAdvancement,
          name: wise.name,
        }));
      return newState;
    }
    case ROLL_SET_OUTCOME: {
      const newState = { ...state };
      newState[action.payload.prop] = action.payload.value;
      return newState;

    }
    case ROLL_SET_WISE_ADVANCEMENT: {
      const newState = { ...state };
      const { wiseName, prop, value } = action.payload;
      newState.wiseAdvancement = state.wiseAdvancement.map(wiseAdvancement => {
        if (wiseAdvancement.name === wiseName) {
          const newAdvancement = { ...wiseAdvancement };
          newAdvancement[prop] = value;
          return newAdvancement;
        } else {
          return wiseAdvancement;
        }
      });
      return newState;
    }
    default:
      return state;
  }
}

const rollReducer = function (state = InitialRoll, action, character) {
  state = {
    ...state,
    dice: reduceDice(state.dice, action, character),
    results: reduceResults(state.results, action, character, state),
    outcome: reduceOutcome(state.outcome, action),
  };

  switch (action.type) {
    case ROLL_GOTO_PAGE:
      state.pageIndex = action.payload.pageIndex;
      break;

    // Stage transitions
    case ROLL_RESET:
      state.stage = ROLL_STAGES.PRE_ROLL;
      state.pageIndex = 0;
      state.impactApplied = false;
      break;

    case ROLL_ROLL_DICE:
      state.stage = ROLL_STAGES.REACT;
      state.pageIndex = ROLL_PAGES.indexOf('REACT');
      break;

    case ROLL_ACCEPT:
      state.stage = ROLL_STAGES.OUTCOME;
      state.pageIndex = ROLL_PAGES.indexOf('OUTCOME');
      break;

    case ROLL_COMMIT_RESULTS:
      state.impactApplied = true;
      break;

    default:
      break;
  }

  return state;
}

export default rollReducer;
