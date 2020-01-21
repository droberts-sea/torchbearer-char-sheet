const disabledOptions = function(state, character) {
  const disabledOptions = {};

  const skillName = state.dice.info.skill;

  // The natureInstead option is only available if the character does not have the skill open
  disabledOptions.natureInstead = !(character && character.skills[skillName] && !character.skills[skillName].open);
  
  // beginner's luck only applies if the skill is not open AND natureInstead has not been selected
  disabledOptions.beginnersLuck = disabledOptions.natureInstead || state.dice.modifiers.natureInstead;
  return disabledOptions;
};

export default disabledOptions;
