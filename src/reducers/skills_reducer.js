import { SkillRules } from '../rules/skills';

const InitialSkills = {};
Object.keys(SkillRules).forEach((name) => {
  const display_name = name.split('_').map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
  const skill = {
    ...SkillRules[name],
    name: display_name,
    rating: 0,
    advancement: {
      pass: 0,
      fail: 0
    }
  };
  InitialSkills[name] = skill;
});

const skillsReducer = function(state=InitialSkills, action) {
  return state;
};

export default skillsReducer;
