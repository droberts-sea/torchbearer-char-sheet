import { MARK_TRAIT, RESET_CHARACTER, IMPORT_CHARACTER, EDIT_CHARACTER_COMMIT } from "../../actions";
import { ROLL_COMMIT_RESULTS } from "../../actions/roll_actions";
import { InitialTraits } from "../../rules/initial_character";

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

const traitsReducer = function (state = InitialTraits, action) {
  switch (action.type) {
    case MARK_TRAIT:
      return updateTraitInList(state, action.payload.name, action.payload.increase);

    case ROLL_COMMIT_RESULTS:
      return updateTraitInList(state, action.payload.beneficialTrait, true);

    case RESET_CHARACTER:
      return InitialTraits;

    case IMPORT_CHARACTER:
    case EDIT_CHARACTER_COMMIT:
      return action.payload.traits;

    default:
      return state;
  }
};

export default traitsReducer;
