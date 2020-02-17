import abilities from './character/abilities_reducer';
import conditions from './character/conditions_reducer';
import points from './character/points_reducer';
import skills from './character/skills_reducer';
import traits from './character/traits_reducer';
import wises from './character/wises_reducer';

import ui from './ui_reducer';

import roll from './roll/roll_reducer';

const CURRENT_CHARACTER_VERSION = 1;

const character = function(state={}, action) {
  if (state.version && state.version !== CURRENT_CHARACTER_VERSION) {
    throw new Error(`Character version mismatch (loaded ${state.version}, code is at ${CURRENT_CHARACTER_VERSION})`);
  }
  return {
    version: CURRENT_CHARACTER_VERSION,
    abilities: abilities(state.abilities, action, state),
    conditions: conditions(state.conditions, action),
    points: points(state.points, action),
    skills: skills(state.skills, action, state),
    traits: traits(state.traits, action, state),
    wises: wises(state.wises, action, state)
  }
};

export const tbCharApp = function(state={}, action) {
  console.log(action.type);
  state = {
    ui: ui(state.ui, action, state.character),
    character: character(state.character, action),
    roll: roll(state.roll, action, state.character)
  };
  console.log(state.character.skills);

  return state;
};
