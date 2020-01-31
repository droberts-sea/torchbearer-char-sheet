const roll_resources = (roll) => {
  const resources = {
    fate: 0,
    persona: 0,
  };

  resources.persona += roll.dice.modifiers.personaDice;

  if (roll.dice.modifiers.tapNature) {
    resources.persona += 1;
  }

  if (roll.results.reactions.deeperUnderstandingUsed) {
    resources.fate += 1;
  }

  if (roll.results.reactions.ofCourse) {
    resources.persona += 1;
  }

  if (roll.results.reactions.explodeSixes) {
    resources.fate += 1;
  }

  return resources;
};

export default roll_resources;