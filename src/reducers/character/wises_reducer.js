import { MARK_WISE } from '../../actions';

export const InitialWises = [
  {
    name: "Deepest Heart of Darkness",
    advancement: {
      pass: false,
      fail: true,
      fate: false,
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

const markWise = function(wises, wiseName, testType, character) {
  // TODO
  console.log(`Marking wise ${wiseName}`);
  return wises;
};

const wisesReducer = function(state=InitialWises, action, character) {
  switch(action.type) {
    case MARK_WISE:
    return markWise(state, action.payload.wiseName, action.payload.testType, character);

    default:
    return state;
  }
};

export default wisesReducer;
