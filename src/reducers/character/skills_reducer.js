import { MARK_TEST, RESET_CHARACTER, IMPORT_CHARACTER } from '../../actions';
import { ROLL_COMMIT_RESULTS } from '../../actions/roll_actions';
import { InitialSkills } from '../../rules/initial_character';

const clearSlate = function (advancement) {
  advancement.pass = 0;
  advancement.fail = 0;
}

export const advanceSkill = function (skill, result, character) {
  if (skill.rating >= skill.max) {
    return skill;
  }
  if (character.conditions.SICK) {
    console.debug("Can't mark advancement while sick!");
    return skill;
  }

  const newAdvancement = { ...skill.advancement };
  switch (result) {
    case 'pass':
      newAdvancement.pass += 1;
      break;

    case 'fail':
      newAdvancement.fail += 1;
      break;

    default:
      throw new Error(`Bogus test result: ${result}`);
  }

  const newSkill = {
    ...skill,
    advancement: newAdvancement,
  }

  // Advancement
  if (skill.open) {
    // If a skill is open, you need passes equal to
    // the rating, and fails equal to the rating - 1
    // See page 104
    if (newAdvancement.pass >= skill.rating &&
      newAdvancement.fail >= skill.rating - 1
    ) {
      console.log(`Advancing ${skill.name}`);
      newSkill.rating = skill.rating + 1;
      clearSlate(newAdvancement);
    }

  } else {
    // If a skill is NOT open, you need tests (pass or fail)
    // equal to current untaxed nature, then the skill opens
    // at rating 2
    // See page 30
    const totalTests = newAdvancement.pass + newAdvancement.fail
    if (totalTests >= character.abilities.NATURE.untaxed) {
      console.log(`Opening ${skill.name}`);
      newSkill.rating = 2;
      newSkill.open = true;
      clearSlate(newAdvancement);
    }
  }
  return newSkill;
};

const markTest = function (state, effect, character) {
  const skillName = effect.name;
  if (effect.category !== 'skills' ||
    !state[skillName]) {
    return state;
  }

  const newState = { ...state };
  newState[skillName] = advanceSkill(
    state[skillName],
    effect.mark,
    character
  );

  return newState;
};

const skillsReducer = function (state = InitialSkills, action, character) {
  switch (action.type) {
    case MARK_TEST:
      return markTest(state, action.payload, character);

    case ROLL_COMMIT_RESULTS:
      state = markTest(state, action.payload.skill, character);
      action.payload.outcome.wiseAdvancement.forEach(wiseAdvancement => {
        if (wiseAdvancement.selectedPerk === 'mark-test') {
          const effect = {
            name: wiseAdvancement.selectedSkill,
            category: 'skills', // XXX this is BS but we don't have a good way to get the category and markTest checks for list inclusion anyway.
            mark: wiseAdvancement.mark,
          };
          state = markTest(state, effect, character);
        }
      });
      return state;

    case RESET_CHARACTER:
      return InitialSkills;

    case IMPORT_CHARACTER:
      return action.payload.skills;

    default:
      return state;
  }
};

export default skillsReducer;
