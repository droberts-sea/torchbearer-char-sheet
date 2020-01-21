import { traitIsAvailable } from '../../rules/traits';

const disabledOptions = function(state, character) {
  const disabledOptions = {};

  const skillName = state.dice.info.skill;

  // The natureInstead option is only available if the character does not have the skill open
  disabledOptions.natureInstead = !(character && character.skills[skillName] && !character.skills[skillName].open);
  
  // beginner's luck only applies if the skill is not open AND natureInstead has not been selected
  disabledOptions.beginnersLuck = disabledOptions.natureInstead || state.dice.modifiers.natureInstead;

  if (state.dice.modifiers.traitName) {
    const trait = character.traits.find(trait => trait.name === state.dice.modifiers.traitName);
    disabledOptions.traitBenefit = !traitIsAvailable(trait);
    disabledOptions.traitOpponent = !state.dice.info.isVersus;
  }
  return disabledOptions;
};

export default disabledOptions;
