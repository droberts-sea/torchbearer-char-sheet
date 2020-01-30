import { traitIsAvailable } from '../../rules/traits';

const addDiceDisabledOptions = function(state, character) {
  const disabledOptions = {};

  const skillName = state.dice.info.skill;

  // BEGINNER'S LUCK
  // The natureInstead option is only available if the character does not have the skill open (page 27)
  disabledOptions.natureInstead = !(character && character.skills[skillName] && !character.skills[skillName].open);

  // beginner's luck cannot be used when a character has the Afraid condition
  const skill = character.skills[state.dice.info.skill];
  disabledOptions.unselectNatureInstead = skill && !skill.open && character.conditions.AFRAID;
  
  // beginner's luck only applies if the skill is not open AND natureInstead has not been selected
  disabledOptions.beginnersLuckHeaders = disabledOptions.natureInstead || state.dice.modifiers.natureInstead;

  // TRAITS
  if (state.dice.modifiers.traitName) {
    const trait = character.traits.find(
      trait => {
        return trait.name === state.dice.modifiers.traitName;
      });

    // Level 1 and 2 traits have limited beneficial uses (per session). In addition, if you're angry you can't use beneficial traits.
    disabledOptions.traitBenefit = !traitIsAvailable(trait) || character.conditions.ANGRY;

    // Helping your opponent only works if you have one.
    disabledOptions.traitOpponent = !state.dice.info.isVersus;
  }
  return disabledOptions;
};

export default addDiceDisabledOptions;
