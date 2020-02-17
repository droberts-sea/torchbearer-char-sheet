import { ConditionRules } from '../rules/conditions';
import {
  InitialPoints,
  InitialTraits,
  InitialWises,
  InitialAbilities,
} from '../rules/initial_character';

const character = {
  skills: {
    ALCHEMIST: {
      name: 'Alchemist',
      beginnersLuck: 'WILL',
      rating: 0,
      open: false,
      advancement: { pass: 0, fail: 0, },
      min: 0, max: 6,
    },
    FIGHTER: {
      name: 'Fighter',
      beginnersLuck: 'HEALTH',
      rating: 4,
      open: true,
      advancement: { pass: 0, fail: 0, },
      min: 0, max: 6,
    },
    ORATOR: {
      name: 'Orator',
      beginnersLuck: 'WILL',
      rating: 3,
      open: true,
      advancement: { pass: 0, fail: 0, },
      min: 0, max: 6,
    }
  },
  abilities: InitialAbilities,
  conditions: {},
  traits: InitialTraits,
  wises: InitialWises,
  points: InitialPoints,
};

Object.keys(ConditionRules).forEach((name) => {
  character.conditions[name] = ConditionRules[name].default_state;
});

// mock character is not fresh (makes things tricky)
character.conditions["FRESH"] = false;

export default Object.freeze(character);
