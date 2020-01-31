const points = (roll) => {
  const points = {
    persona: [],
    fate: [],
    checks: [],
    total: {
      fate: 0,
      persona: 0,
      checks: 0,
    },
  };

  if (roll.dice.modifiers.personaDice) {
    points.persona.push({
      source: 'persona dice',
      effect: roll.dice.modifiers.personaDice,
    });
  }

  if (roll.dice.modifiers.tapNature) {
    points.persona.push({
      source: 'tap nature',
      effect: 1,
    });
  }

  if (roll.results.reactions.deeperUnderstandingUsed) {
    points.fate.push({
      source: 'deeper understanding',
      effect: 1,
    });
  }

  if (roll.results.reactions.ofCourseUsed) {
    points.persona.push({
      source: 'of course',
      effect: 1,
    });
  }

  if (roll.results.reactions.explodeSixes) {
    points.fate.push({
      source: 'fate for luck',
      effect: 1,
    });
  }

  points.total = {
    fate: points.fate.reduce((m, f) => m + f.effect, 0),
    persona: points.persona.reduce((m, p) => m + p.effect, 0),
    checks: points.checks.reduce((m, c) => m + c.effect, 0),
  }

  return points;
};

const impact = (roll) => {
  const impact = {
    points: points(roll),
  };

  return impact;
};

export default impact;