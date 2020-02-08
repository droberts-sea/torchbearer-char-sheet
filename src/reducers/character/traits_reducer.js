import { MARK_TRAIT } from "../../actions";
import { ROLL_COMMIT_RESULTS } from "../../actions/roll_actions";

export const InitialTraits = [
  {
    name: "Firey",
    level: 1,
    uses: 0
  },
  {
    name: "Jaded",
    level: 2,
    uses: 2
  },
  {
    name: "Curious",
    level: 3,
    uses: 0
  }
];

const updateTraitInList = (traits, name, increase) => {
  return traits.map(trait => {
    if (trait.name === name &&
      trait.level < 3) {
      if (increase) {
        return {
          ...trait,
          uses: Math.min(trait.uses + 1, trait.level),
        };
      } else {
        return {
          ...trait,
          uses: Math.max(trait.uses - 1, 0),
        };
      }
    } else {
      return trait;
    }
  });
}

const traitsReducer = function (state = InitialTraits, action, character) {
  switch (action.type) {
    case MARK_TRAIT:
      return updateTraitInList(state, action.payload.name, action.payload.increase);

    case ROLL_COMMIT_RESULTS:
      return updateTraitInList(state, action.payload.beneficialTrait, true);

    default:
      return state;
  }
};

export default traitsReducer;
