import { combineReducers } from 'redux';

import {
  SHOW_TAB,
  Tabs,
  SKILL_COLLAPSE
} from '../actions';

function currentTab(state=Tabs.ROLL, action) {
  switch (action.type) {
    case SHOW_TAB:
    console.log(`Showing tab: ${action.payload.tab}`);
    return action.payload.tab;
    default:
    return state;
  }
}

const InitialSkillTableState = {
  collapsed: false
};

function skillTable(state=InitialSkillTableState, action) {
  if (action.type === SKILL_COLLAPSE) {
    console.log("Skill collapse");
    return {
      ...state,
      collapsed: !state.collapsed
    }
  } else {
    return state;
  }
}

const ui = combineReducers({
  currentTab,
  skillTable
});

export default ui;
