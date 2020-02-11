import {
  SHOW_TAB,
  Tabs,
  TOGGLE_MENU,
  SKILL_COLLAPSE,
  EDIT_CHARACTER_BEGIN,
  EDIT_CHARACTER_COMMIT,
  EDIT_CHARACTER_REVERT,
  EDIT_CHARACTER_PROPERTY,
  EDIT_CHARACTER_ADD_FIELD,
  EDIT_CHARACTER_REMOVE_FIELD
} from '../actions';

import update from 'immutability-helper';

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
  open: true,
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

const editCharacterProperty = (state, value, path) => {
  const command = { character: {} };
  let target = command.character;

  path.forEach((node) => {
    target[node] = {};
    target = target[node];
  });
  target['$set'] = value;
  
  return update(state, command);
}

const editCharacter = (state = InitialEditCharacterState, action, savedCharacter) => {
  switch (action.type) {
    case EDIT_CHARACTER_BEGIN:
      return {
        ...state,
        editMode: true,
        character: savedCharacter,
      };

    case EDIT_CHARACTER_COMMIT:
      console.log("Commit character edits");
      return state;

    case EDIT_CHARACTER_REVERT:
      return InitialEditCharacterState;

    case EDIT_CHARACTER_PROPERTY:
      console.log("Editing property");
      console.log(action.payload);
      return editCharacterProperty(state, action.payload.value, action.payload.path);

    case EDIT_CHARACTER_ADD_FIELD:
      console.log("Adding field");
      console.log(action.payload);
      return state;

    case EDIT_CHARACTER_REMOVE_FIELD:
      console.log("Removing field");
      console.log(action.payload);
      return state;

    default:
      return state;
  }
};

const ui = (state={}, action, savedCharacter) => {
  return {
    currentTab: currentTab(state.currentTab, action),
    skillTable: skillTable(state.skillTable, action),
    menu: menu(state.menu, action),
    editCharacter: editCharacter(state.editCharacter, action, savedCharacter)
  }
};

export default ui;
