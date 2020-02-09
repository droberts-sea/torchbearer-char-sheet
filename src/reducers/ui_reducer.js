import { combineReducers } from 'redux';

import {
  SHOW_TAB,
  Tabs,
  TOGGLE_MENU,
  SKILL_COLLAPSE,
  EDIT_CHARACTER_BEGIN,
  EDIT_CHARACTER_COMMIT,
  EDIT_CHARACTER_REVERT
} from '../actions';

function currentTab(state = Tabs.STATS, action) {
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

function skillTable(state = InitialSkillTableState, action) {
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

const InitialMenuState = Object.freeze({
  open: false,
});

const menu = (state = InitialMenuState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      console.log("toggle menu");
      state = { ...state };
      state.open = !state.open;
      return state;

    default:
      return state;
  }
}

const InitialEditCharacterState = Object.freeze({
  editMode: false,
  character: undefined,
});

const editCharacter = (state = InitialEditCharacterState, action) => {
  switch (action.type) {
    case EDIT_CHARACTER_BEGIN:
      return {
        ...state,
        editMode: true,
      };

    case EDIT_CHARACTER_COMMIT:
      console.log("Commit character edits");
      return state;

    case EDIT_CHARACTER_REVERT:
      return InitialEditCharacterState;

    default:
      return state;
  }
}

const ui = combineReducers({
  currentTab,
  skillTable,
  menu,
  editCharacter,
});

export default ui;
