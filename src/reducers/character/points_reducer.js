import {
  ADD_POINT,
  SPEND_POINT
} from '../../actions';

const InitialPoints = {
  fate: {
    available: 0,
    spent: 0
  },
  persona: {
    available: 0,
    spent: 0
  },
  checks: {
    available: 0,
    spent: 0
  }
};

const pointsReducer = function(state=InitialPoints, action) {
  if (action.type !== ADD_POINT && action.type !== SPEND_POINT) {
    return state;
  }

  const category = action.payload.category;
  const bucket = state[category];
  const newState = {...state};

  switch(action.type) {
    case ADD_POINT:
    newState[category] = {
      ...bucket,
      available: bucket.available + 1
    }
    break;

    case SPEND_POINT:
    if (bucket.available > 0) {
      newState[category] = {
        ...bucket,
        available: bucket.available - 1,
        spent: bucket.spent + 1
      }
    }
    break;

    default:
    throw new Error('How did we even get here?');

  }

  return newState;
};

export default pointsReducer;
