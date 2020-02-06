import { ConditionRules } from '../rules/conditions';
import { InitialTraits } from '../reducers/character/traits_reducer';
import { InitialWises } from '../reducers/character/wises_reducer';
import { InitialPoints } from '../reducers/character/points_reducer';

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
      rating: 0,
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
  abilities: {
    WILL: {
      name: 'Will',
      rating: 3
    },
    HEALTH: {
      name: 'Health',
      rating: 5
    },
    NATURE: {
      name: 'Nature',
      rating: 4,
      untaxed: 5,
    },
    RESOURCES: {
      name: 'Resources',
      rating: 3
    },
    CIRCLES: {
      name: 'Circles',
      rating: 2
    }
  },
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
