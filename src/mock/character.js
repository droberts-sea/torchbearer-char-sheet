import { ConditionRules } from '../rules/conditions';

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
    }
  },
  conditions: {}
};

Object.keys(ConditionRules).forEach((name) => {
  character.conditions[name] = ConditionRules[name].default_state;
});

// mock character is not fresh (makes things tricky)
character.conditions["FRESH"] = false;

export default Object.freeze(character);
