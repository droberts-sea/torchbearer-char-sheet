import { SkillRules } from '../../rules/skills';
import { MARK_TEST } from '../../actions';

const InitialSkills = {};
Object.keys(SkillRules).forEach((name) => {
  const display_name = name.split('_').map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
  const skill = {
    ...SkillRules[name],
    name: display_name,
    rating: 0,
    min: 0,
    max: 6, // Skills are rated from 1 to 6 (pg 13)
    advancement: {
      pass: 0,
      fail: 0
    },
    open: false // Skill rating can be 0 but still open
  };
  InitialSkills[name] = skill;
});

const clearSlate = function(advancement) {
  advancement.pass = 0;
  advancement.fail = 0;
}

export const advanceSkill = function(skill, result, character) {
  if (skill.rating >= skill.max) {
    return skill;
  }
  if (character.conditions.SICK) {
    console.debug("Can't mark advancement while sick!");
    return skill;
  }

  const newAdvancement = { ...skill.advancement };
  switch (result) {
    case 'PASS':
    newAdvancement.pass += 1;
    break;

    case 'FAIL':
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

const markTest = function(state, action, character) {
  const skillName = action.payload.skillName;
  if (!state[skillName]) {
    return state;
  }

  const newState = { ...state };
  newState[skillName] = advanceSkill(
    state[skillName],
    action.payload.result,
    character
  );

  return newState;
};

const skillsReducer = function(state=InitialSkills, action, character) {
  switch(action.type) {
    case MARK_TEST:
    return markTest(state, action, character);

    default:
    return state;
  }
};

export default skillsReducer;
