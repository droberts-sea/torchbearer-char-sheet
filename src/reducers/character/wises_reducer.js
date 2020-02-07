import { MARK_WISE } from '../../actions';
import { ROLL_COMMIT_RESULTS } from '../../actions/roll_actions';

export const InitialWises = [
  {
    name: "Deepest Heart of Darkness",
    advancement: {
      pass: true,
      fail: true,
      fate: true,
      persona: false
    }
  },
  {
    name: "Home",
    advancement: {
      pass: false,
      fail: false,
      fate: false,
      persona: true
    }
  }
];

const markWise = function (wises, wiseName, testType, character) {
  // TODO
  console.log(`Marking wise ${wiseName}`);
  return wises;
};

const wisesReducer = function (state = InitialWises, action, character) {
  switch (action.type) {
    case MARK_WISE:
      return markWise(state, action.payload.wiseName, action.payload.testType, character);

    case ROLL_COMMIT_RESULTS:
      console.log("Committing results");
      console.log(action.payload);

    default:
      return state;
  }
};

export default wisesReducer;
