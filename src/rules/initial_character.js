import { ConditionRules } from './conditions';
import { SkillRules } from './skills';
import { newTrait } from './traits';
import { newWise } from './wises';

// See _Abilities_, page 26
export const InitialAbilities = Object.freeze({
  NATURE: {
    name: 'Nature',
    rating: 3,
    untaxed: 5,
    min: 0,
    max: 7,
    advancement: {
      pass: 0,
      fail: 0
    },
    open: true, // All abilities are always open
    descriptors: ['Sneaking', 'Riddling', 'Merrymaking']
  },
  WILL: {
    name: 'Will',
    rating: 5,
    min: 1,
    max: 6,
    advancement: {
      pass: 0,
      fail: 0
    },
    open: true
  },
  HEALTH: {
    name: 'Health',
    rating: 3,
    min: 1,
    max: 6,
    advancement: {
      pass: 0,
      fail: 0
    },
    open: true
  },
  RESOURCES: {
    name: 'Resources',
    rating: 3,
    min: 0,
    max: 10,
    advancement: {
      pass: 0,
      fail: 0
    },
    open: true
  },
  CIRCLES: {
    name: 'Circles',
    rating: 4,
    min: 1,
    max: 10,
    advancement: {
      pass: 0,
      fail: 0
    },
    open: true
  },
  MIGHT: {
    name: 'Might',
    rating: 3,
    open: true // do you ever even roll might?
  }
});

const conditions = {};
Object.keys(ConditionRules).forEach((name) => {
  conditions[name] = ConditionRules[name].default_state;
});
export const InitialConditions = Object.freeze(conditions);

export const InitialPoints = Object.freeze({
  fate: {
    available: 3,
    spent: 0
  },
  persona: {
    available: 3,
    spent: 0
  },
  checks: {
    available: 0,
    spent: 0
  }
});

const InitialSkills = {};

Object.keys(SkillRules).forEach(name => {
  const display_name = name.split('_').map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
  InitialSkills[name] = {
    beginnersLuck: SkillRules[name].beginnersLuck,
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
});

const frozenSkills = Object.freeze(InitialSkills)
export { frozenSkills as InitialSkills};

export const InitialTraits = Object.freeze([
  newTrait(0, 'Firey'),
  newTrait(1, 'Jaded', 2),
  newTrait(2, 'Curious', 3),
]);

export const InitialWises = Object.freeze([
  newWise(0, 'Deepest Heart of Darkness'),
  newWise(1, 'Home'),
]);

export const InitialBio = Object.freeze({
  name: 'Tilly the Red',
  stock: 'Halfling',
  class: 'Burgular',
  level: '1',
})