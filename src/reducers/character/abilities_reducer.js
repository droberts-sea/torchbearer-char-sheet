import { MARK_TEST } from '../../actions';
import { advanceSkill } from './skills_reducer';
import { ROLL_COMMIT_RESULTS } from '../../actions/roll_actions';

// See _Abilities_, page 26
const InitialAbilities = {
  NATURE: {
    name: 'Nature',
    rating: 3,
    untaxed: 5,
    min: 0,
    max: 7,
    advancement: {
      pass: 0,
      fail: 0
    },
    open: true, // All abilities are always open
    descriptors: ['Sneaking', 'Riddling', 'Merrymaking']
  },
  WILL: {
    name: 'Will',
    rating: 5,
    min: 1,
    max: 6,
    advancement: {
      pass: 0,
      fail: 0
    },
    open: true
  },
  HEALTH: {
    name: 'Health',
    rating: 3,
    min: 1,
    max: 6,
    advancement: {
      pass: 0,
      fail: 0
    },
    open: true
  },
  RESOURCES: {
    name: 'Resources',
    rating: 3,
    min: 0,
    max: 10,
    advancement: {
      pass: 0,
      fail: 0
    },
    open: true
  },
  CIRCLES: {
    name: 'Circles',
    rating: 4,
    min: 1,
    max: 10,
    advancement: {
      pass: 0,
      fail: 0
    },
    open: true
  },
  MIGHT: {
    name: 'Might',
    rating: 3,
    open: true // do you ever even roll might?
  }
}

const markTest = function (state, effect, character) {
  // We use the MARK_TEST action for both skills and abilities
  const ability = effect.name;
  if (effect.category !== 'abilities' ||
    !state[ability] ||
    ability === 'MIGHT') {
    return state;
  }

  const newState = { ...state };
  newState[ability] = advanceSkill(state[ability], effect.mark, character);

  return newState;
}

const taxNature = (state, amount) => {
  const newState = {...state};
  newState.NATURE.rating -= amount;
  if (newState.NATURE.rating <= 0) {
    newState.NATURE.untaxed -= 1;
    newState.NATURE.rating = newState.NATURE.untaxed;

    // TODO nature to 0?
  }
  return newState;
}

const abilitiesReducer = function (state = InitialAbilities, action, character) {
  switch (action.type) {
    case MARK_TEST:
      return markTest(state, action.payload, character);

    case ROLL_COMMIT_RESULTS:
      // Engineering decision: tax comes first. See also derivers/roll/impact.js
      if (action.payload.taxNature) {
        state = taxNature(state, action.payload.taxNature.total)
      }
      state = markTest(state, action.payload.skill, character);

      action.payload.outcome.wiseAdvancement.forEach(wiseAdvancement => {
        if (wiseAdvancement.selectedPerk === 'mark-test') {
          const effect = {
            name: wiseAdvancement.selectedSkill,
            category: 'abilities', // XXX this is BS but we don't have a good way to get the category and markTest checks for list inclusion anyway.
            mark: wiseAdvancement.mark,
          };
          state = markTest(state, effect, character);
        }
      });

      return state;

    default:
      return state;
  }
}

export default abilitiesReducer;
