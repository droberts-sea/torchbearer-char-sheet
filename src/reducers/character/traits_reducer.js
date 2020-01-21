const InitialTraits = [
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

const traitsReducer = function(state=InitialTraits, action, character) {
  switch(action.type) {
    default:
    return state;
  }
};

export default traitsReducer;
