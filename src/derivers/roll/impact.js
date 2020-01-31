const impact = (roll) => {
  const impact = {
    points: {
      persona: [],
      fate: [],
      checks: [],
      total: {
        fate: 0,
        persona: 0,
        checks: 0,
      },
    },
  };

  impact.points.total.persona += roll.dice.modifiers.personaDice;

  if (roll.dice.modifiers.tapNature) {
    impact.points.total.persona += 1;
  }

  if (roll.results.reactions.deeperUnderstandingUsed) {
    impact.points.total.fate += 1;
  }

  if (roll.results.reactions.ofCourse) {
    impact.points.total.persona += 1;
  }

  if (roll.results.reactions.explodeSixes) {
    impact.points.total.fate += 1;
  }

  return impact;
};

export default impact;