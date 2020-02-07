import { MARK_TEST } from '../../actions';
import { advanceSkill } from './skills_reducer';

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

const markTest = function (state, action, character) {
  // We use the MARK_TEST action for both skills and abilities
  const ability = action.payload.name;
  if (action.payload.category !== 'abilities' ||
    !state[ability] ||
    ability === 'MIGHT') {
    return state;
  }

  const newState = { ...state };
  newState[ability] = advanceSkill(state[ability], action.payload.mark, character);

  return newState;
}

const abilitiesReducer = function (state = InitialAbilities, action, character) {
  switch (action.type) {
    case MARK_TEST:
      return markTest(state, action, character);

    //
    // case TAX:
    // console.log('TODO: implement tax');
    // return state;
    // break;

    default:
      return state;
  }
}

export default abilitiesReducer;
