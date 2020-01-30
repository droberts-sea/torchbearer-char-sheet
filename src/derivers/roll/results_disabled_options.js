const wiseDisabledOptions = (roll, character, effect, resource) => {
  const reactions = roll.results.reactions;
  const wiseDisabledOptions = {};

  if (character.conditions.ANGRY ||
    character.points[resource].available < 1 ||
    reactions[effect + 'Used']) {
    wiseDisabledOptions.button = true;
    wiseDisabledOptions.select = true;
  }

  if (!reactions[effect + 'Wise']) {
    wiseDisabledOptions.button = true;
  }

  const oppositeEffect = effect === 'ofCourse' ? 'deeperUnderstanding' : 'ofCourse';
  if (reactions[oppositeEffect + 'Wise']) {
    wiseDisabledOptions.wises = [reactions[oppositeEffect + 'Wise']];
  } else {
    wiseDisabledOptions.wises = [];
  }

  return wiseDisabledOptions;
}

const resultsDisabledOptions = (roll, character) => {
  const disabledOptions = {};

  if (character.points.fate.available < 1 || roll.results.reactions.explodeSixes) {
    disabledOptions.explodeSixes = true;
  }

  disabledOptions.deeperUnderstanding = wiseDisabledOptions(roll, character, 'deeperUnderstanding', 'fate');

  disabledOptions.ofCourse = wiseDisabledOptions(roll, character, 'ofCourse', 'persona');

  // console.log(disabledOptions);

  return disabledOptions;
};

export default resultsDisabledOptions;