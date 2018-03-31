import { combineReducers } from 'redux';

import conditions from './conditions_reducer';
import points from './points_reducer';
import abilities from './abilities_reducer';
import skills from './skills_reducer';

import ui from './ui_reducer';

const character = function(state={}, action) {
  return {
    conditions: conditions(state.conditions, action),
    points: points(state.points, action),
    abilities: abilities(state.abilities, action, state),
    skills: skills(state.skills, action, state)
  }
};

export const tbCharApp = combineReducers({
  ui,
  character,
});
