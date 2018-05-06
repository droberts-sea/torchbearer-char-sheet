const disabledOptions = function(state, character) {
  const disabledOptions = {};

  const skillName = state.dice.info.skill;

  disabledOptions.natureInstead = !(character && character.skills[skillName] && !character.skills[skillName].open);

  return disabledOptions;
};

export default disabledOptions;
