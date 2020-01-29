import { ConditionRules } from '../rules/conditions';
import { InitialTraits } from '../reducers/character/traits_reducer';
import {InitialWises} from '../reducers/character/wises_reducer';

const character = {
  skills: {
    ALCHEMIST: {
      name: 'Alchemist',
      beginnersLuck: 'WILL',
      rating: 0,
      open: false
    },
    FIGHTER: {
      name: 'Fighter',
      beginnersLuck: 'HEALTH',
      rating: 0,
      open: true
    },
    ORATOR: {
      name: 'Orator',
      beginnersLuck: 'WILL',
      rating: 3,
      open: true
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
      rating: 4
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
};

Object.keys(ConditionRules).forEach((name) => {
  character.conditions[name] = ConditionRules[name].default_state;
});

// mock character is not fresh (makes things tricky)
character.conditions["FRESH"] = false;

export default Object.freeze(character);
