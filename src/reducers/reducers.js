import { combineReducers } from 'redux';

import abilities from './character/abilities_reducer';
import conditions from './character/conditions_reducer';
import points from './character/points_reducer';
import skills from './character/skills_reducer';
import traits from './character/traits_reducer';
import wises from './character/wises_reducer';

import ui from './ui_reducer';

import roll from './roll/roll_reducer';

const character = function(state={}, action) {
  return {
    abilities: abilities(state.abilities, action, state),
    conditions: conditions(state.conditions, action),
    points: points(state.points, action),
    skills: skills(state.skills, action, state),
    traits: traits(state.traits, action, state),
    wises: wises(state.wises, action, state)
  }
};

export const tbCharApp = function(state={}, action) {
  return {
    ui: ui(state.ui, action),
    character: character(state.character, action),
    roll: roll(state.roll, action, state.character)
  }
};
