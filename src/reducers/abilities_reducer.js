import { MARK_TEST } from '../actions';

const InitialAbilities = {
  WILL: {
    name: 'Will',
    rating: 5,
    advancement: {
      pass: 0,
      fail: 0
    }
  },
  HEALTH: {
    name: 'Health',
    rating: 3,
    advancement: {
      pass: 0,
      fail: 0
    }
  },
  NATURE: {
    name: 'Nature',
    rating: 3,
    untaxed: 5,
    advancement: {
      pass: 0,
      fail: 0
    },
    descriptors: ['Sneaking', 'Riddling', 'Merrymaking']
  },
  RESOURCES: {
    name: 'Resources',
    rating: 3,
    advancement: {
      pass: 0,
      fail: 0
    }
  },
  CIRCLES: {
    name: 'Circles',
    rating: 4,
    advancement: {
      pass: 0,
      fail: 0
    }
  },
  MIGHT: {
    name: 'Might',
    rating: 3
  }
}

const markTest = function(state, action) {
  // See rulebook page 104: Advancement
  // TODO: No advancement if sick

  // We use the MARK_TEST action for both skills and abilities
  const ability = action.payload.skillName;
  if (!state[ability]) {
    return state;
  }

  const newAdvancement = { ...state[ability].advancement };
  switch (action.payload.result) {
    case 'PASS':
    newAdvancement.pass += 1;
    break;

    case 'FAIL':
    newAdvancement.fail += 1;
    break;

    default:
    throw `Bogus test result: ${action.payload.result}`;
  }

  // Advancement
  let rating = state[ability].rating;
  if (newAdvancement.pass >= rating &&
    newAdvancement.fail >= rating - 1
  ) {
    rating += 1;
    newAdvancement.pass = 0;
    newAdvancement.fail = 0;
    // TODO: resources only once per town phase
  }

  const newState = { ...state };
  newState[ability] = {
    ...state[ability],
    advancement: newAdvancement,
    rating: rating
  }

  return newState;
}

const abilitiesReducer = function(state=InitialAbilities, action) {
  switch (action.type) {
    case MARK_TEST:
    return markTest(state, action);

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
