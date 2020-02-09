import {
  ADD_POINT,
  SPEND_POINT,
  RESET_CHARACTER,
  IMPORT_CHARACTER
} from '../../actions';
import { ROLL_COMMIT_RESULTS } from '../../actions/roll_actions';
import { InitialPoints } from '../../rules/initial_character';

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

const addOrSpendPoint = (state, action) => {
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
}

const pointsReducer = function (state = InitialPoints, action) {
  switch (action.type) {
    case ROLL_COMMIT_RESULTS:
      return updateAfterRoll(state, action.payload.points.total);

    case ADD_POINT:
    case SPEND_POINT:
      return addOrSpendPoint(state, action);

    case RESET_CHARACTER:
      return InitialPoints;

    case IMPORT_CHARACTER:
      return action.payload.points;

    default:
      return state;
  }
};

export default pointsReducer;
