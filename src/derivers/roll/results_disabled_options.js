const wiseDisabledOptions = (roll, character, resourcesSpent, effect, resource) => {
  const reactions = roll.results.reactions;
  const wiseDisabledOptions = {};

  const resourcesAvailable = character.points[resource].available - resourcesSpent[resource];
  if (character.conditions.ANGRY ||
    resourcesAvailable < 1 ||
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
};

const resultsDisabledOptions = (roll, character, resourcesSpent) => {
  const disabledOptions = {};

  const fateAvailable = character.points.fate.available - resourcesSpent.fate;
  if (fateAvailable < 1 || roll.results.reactions.explodeSixes) {
    disabledOptions.explodeSixes = true;
  }

  disabledOptions.deeperUnderstanding = wiseDisabledOptions(roll, character, resourcesSpent, 'deeperUnderstanding', 'fate');

  disabledOptions.ofCourse = wiseDisabledOptions(roll, character, resourcesSpent, 'ofCourse', 'persona');

  // console.log(disabledOptions);

  return disabledOptions;
};

export default resultsDisabledOptions;