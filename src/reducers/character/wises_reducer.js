import { MARK_TEST } from '../../actions';
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

const clearSlate = () => {
  return {
    pass: false,
    fail: false,
    fate: false,
    persona: false,
  };
}

// effect: {name, mark, unmark}
const markWises = function (wises, effects) {
  return wises.map(wise => {
    for (let i = 0; i < effects.length; i++) {
      const { name, mark, unmark } = effects[i];
      if (wise.name === name) {
        const newWise = { ...wise };
        newWise.advancement = { ...wise.advancement };
        newWise.advancement[mark] = !unmark;
        return newWise;
      }
    }
    return wise;
  });
};

const advanceWises = (state, wiseAdvancementList) => {
  return state.map((wise) => {
    for (let i = 0; i < wiseAdvancementList.length; i++) {
      const wiseAdvancement = wiseAdvancementList[i];
      if (wise.name === wiseAdvancement.name) {
        const newWise = {
          ...wise,
          advancement: clearSlate(),
        };
        if (wiseAdvancement.selectedPerk === 'change-wise') {
          newWise.name = wiseAdvancement.newWiseName;
        }
        return newWise;
      }
    }
    return wise;
  });
};

const wisesReducer = function (state = InitialWises, action) {
  // TODO: advancement! How do we pop up a UI to represent this?
  // Using Wises (pg 21)
  // Once you’ve done all four, you can change the wise, or take either a Beginner’s Luck or a skill advancement test related to the wise. If you choose not to change the wise, the wise remains. You don’t lose it in exchange for the test. Once you’ve used a wise all four ways, choose your perk, reset your marks and try it again.
  switch (action.type) {
    case MARK_TEST:
      if (action.payload.category === 'wises') {
        return markWises(
          state,
          [action.payload]
        );
      }
      break;

    case ROLL_COMMIT_RESULTS:
      let newState = markWises(
        state,
        action.payload.wises
      );

      newState = advanceWises(newState, action.payload.outcome.wiseAdvancement);

      return newState;

    default:
      break;
  }
  return state;
};

export default wisesReducer;
