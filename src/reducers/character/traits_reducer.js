import { MARK_TRAIT } from "../../actions";

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

const traitsReducer = function (state = InitialTraits, action, character) {
  switch (action.type) {
    case MARK_TRAIT:
      return state.map(trait => {
        if (trait.name === action.payload.name) {
          if (action.payload.increase) {
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

    default:
      return state;
  }
};

export default traitsReducer;
