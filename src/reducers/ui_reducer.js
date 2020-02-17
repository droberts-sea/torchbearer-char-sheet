import {
  SHOW_TAB,
  Tabs,
  TOGGLE_MENU,
  EDIT_CHARACTER_BEGIN,
  EDIT_CHARACTER_COMMIT,
  EDIT_CHARACTER_REVERT,
  EDIT_CHARACTER_PROPERTY,
  EDIT_CHARACTER_ADD_FIELD,
  EDIT_CHARACTER_REMOVE_FIELD,
  SKILL_DISPLAY_OPTIONS,
  SET_SKILL_DISPLAY
} from '../actions';

import update from 'immutability-helper';
import { newWise } from '../rules/wises';
import { newTrait } from '../rules/traits';

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
  display: SKILL_DISPLAY_OPTIONS.CORE
};

function skillTable(state = InitialSkillTableState, action) {
  if (action.type === SET_SKILL_DISPLAY) {
    return {
      ...state,
      display: action.payload.display
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

// The API for immutability-helper is not super intuitive
// (though still better than managing everything by hand)
// See https://github.com/kolodny/immutability-helper
const editCharacterProperty = (state, value, path) => {
  const command = { character: {} };
  let target = command.character;

  path.forEach((node) => {
    target[node] = {};
    target = target[node];
  });
  target['$set'] = value;

  return update(state, command);
};

const editCharacterAddField = (state, category) => {
  const findNextId = items => Math.max(items.map(i => i.id)) + 1;
  const nextId = findNextId(state.character[category]);

  let emptyField = {
    wises: newWise,
    traits: newTrait,
  }[category](nextId);

  return update(state, { character: { [category]: { $push: [emptyField] } } });
}

const editCharacterRemoveField = (state, category, index) => {
  return update(state, { character: { [category]: { $splice: [[index, 1]] } } });
};

const editCharacter = (state = InitialEditCharacterState, action, savedCharacter) => {
  switch (action.type) {
    case EDIT_CHARACTER_BEGIN:
      return {
        ...state,
        editMode: true,
        character: savedCharacter,
      };

    case EDIT_CHARACTER_COMMIT:
    case EDIT_CHARACTER_REVERT:
      return InitialEditCharacterState;

    case EDIT_CHARACTER_PROPERTY:
      console.debug("Editing property");
      console.debug(action.payload);
      return editCharacterProperty(state, action.payload.value, action.payload.path);

    case EDIT_CHARACTER_ADD_FIELD:
      console.debug("Adding field");
      console.debug(action.payload);
      return editCharacterAddField(state, action.payload.category);

    case EDIT_CHARACTER_REMOVE_FIELD:
      console.debug("Removing field");
      console.debug(action.payload);
      return editCharacterRemoveField(state, action.payload.category, action.payload.index);

    default:
      return state;
  }
};

const ui = (state = {}, action, savedCharacter) => {
  return {
    currentTab: currentTab(state.currentTab, action),
    skillTable: skillTable(state.skillTable, action),
    menu: menu(state.menu, action),
    editCharacter: editCharacter(state.editCharacter, action, savedCharacter)
  }
};

export default ui;
