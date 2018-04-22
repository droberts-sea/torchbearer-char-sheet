import { combineReducers } from 'redux';

import abilities from './abilities_reducer';
import conditions from './conditions_reducer';
import points from './points_reducer';
import skills from './skills_reducer';
import traits from './traits_reducer';
import wises from './wises_reducer';

import ui from './ui_reducer';

import roll from './roll_reducer';

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
