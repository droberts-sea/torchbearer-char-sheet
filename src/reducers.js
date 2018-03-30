import { combineReducers } from 'redux';
import {
  SHOW_TAB,
  Tabs
} from './actions';
import conditions from './reducers/conditions_reducer';
import points from './reducers/points_reducer';
import abilities from './reducers/abilities_reducer';

const character = combineReducers({
  conditions,
  points,
  abilities
});

function currentTab(state=Tabs.STATS, action) {
  switch (action.type) {
    case SHOW_TAB:
    console.log(`Showing tab: ${action.payload.tab}`);
    return action.payload.tab;
    default:
    return state;
  }
}

export const tbCharApp = combineReducers({
  currentTab,
  character,
});
