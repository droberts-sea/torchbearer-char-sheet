import { combineReducers } from 'redux';
import {
  TOGGLE_CONDITION,
  SHOW_TAB,
  Tabs,
} from './actions';
import { Conditions, ConditionRules } from './rules/conditions';

const InitialConditions = {};
Object.keys(ConditionRules).forEach((name) => {
  InitialConditions[name] = ConditionRules[name].default_state;
})

const InitialState = {
  currentTab: Tabs.INFO,
  character: {
    conditions: InitialConditions
  }
};

// TODO: consider renaming oldConditions state
function conditions(state=InitialState.character.conditions, action) {
  switch (action.type) {
    case TOGGLE_CONDITION:
    const name = action.payload.condition;
    const newConditions = {...state};
    newConditions[name] = !state[name];

    // Getting another condition removes fresh
    if (name != Conditions.FRESH && newConditions[name]) {
      newConditions[Conditions.FRESH] = false;
    }
    return newConditions;

    default:
    return state;
  }
}

const character = combineReducers({
  conditions
});

function currentTab(state=InitialState.currentTab, action) {
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
