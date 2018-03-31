import { combineReducers } from 'redux';

import conditions from './reducers/conditions_reducer';
import points from './reducers/points_reducer';
import abilities from './reducers/abilities_reducer';
import skills from './reducers/skills_reducer';

import ui from './reducers/ui_reducer';

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
