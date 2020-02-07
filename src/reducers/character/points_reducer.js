import {
  ADD_POINT,
  SPEND_POINT
} from '../../actions';
import { ROLL_COMMIT_RESULTS } from '../../actions/roll_actions';

export const InitialPoints = {
  fate: {
    available: 3,
    spent: 0
  },
  persona: {
    available: 3,
    spent: 0
  },
  checks: {
    available: 0,
    spent: 0
  }
};

const updateAfterRoll = (state, totals) => {
  const updateBucket = (bucket, spent) => {
    // Don't allow overspend
    const available = Math.max(bucket.available - spent, 0);
    spent = bucket.available - available;
    return {
      available: available,
      spent: bucket.spent + spent,
    };
  }
  return {
    fate: updateBucket(state.fate, totals.fate),
    persona: updateBucket(state.persona, totals.persona),
    // checks are earned, not spent, during a roll
    checks: {
      ...state.checks,
      available: state.checks.available + totals.checks,
    }
  }
}

const pointsReducer = function (state = InitialPoints, action) {
  if (action.type === ROLL_COMMIT_RESULTS) {
    return updateAfterRoll(state, action.payload.points.total);

  } else if (action.type !== ADD_POINT &&
    action.type !== SPEND_POINT) {
    return state;
  }

  const category = action.payload.category;
  const bucket = state[category];
  const newState = { ...state };

  switch (action.type) {
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
