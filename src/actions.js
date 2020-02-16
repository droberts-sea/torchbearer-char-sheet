/*
* Action types
*/

// UI
export const SET_SKILL_DISPLAY = 'SET_SKILL_DISPLAY';
export const SHOW_TAB = 'SHOW_TAB';
export const TOGGLE_MENU = 'TOGGLE_MENU';

// INFO
export const SET_CONDITION = 'SET_CONDITION';
export const ADD_POINT = 'ADD_POINT';
export const SPEND_POINT = 'SPEND_POINT';

// STATS
export const MARK_TEST = 'MARK_TEST';
export const MARK_TRAIT = 'MARK_TRAIT';

// Character Management
export const RESET_CHARACTER = 'RESET_CHARACTER';
export const IMPORT_CHARACTER = 'IMPORT_CHARACTER';
export const EDIT_CHARACTER_BEGIN = 'EDIT_CHARACTER_BEGIN';
export const EDIT_CHARACTER_COMMIT = 'EDIT_CHARACTER_COMMIT';
export const EDIT_CHARACTER_REVERT = 'EDIT_CHARACTER_REVERT';
export const EDIT_CHARACTER_PROPERTY = 'EDIT_CHARACTER_PROPERTY';
export const EDIT_CHARACTER_ADD_FIELD = 'EDIT_CHARACTER_ADD_FIELD';
export const EDIT_CHARACTER_REMOVE_FIELD = 'EDIT_CHARACTER_REMOVE_FIELD';


/* Other Constants */

export const Tabs = {
  BIO: 'BIO',
  STATS: 'STATS',
  INFO: 'INFO',
  GEAR: 'GEAR',
  ROLL: 'ROLL'
}

export const PointCategories = {
  FATE: 'fate',
  PERSONA: 'persona',
  CHECKS: 'checks'
}

/* Action Creators */

export function toggleCondition(condition, isActive) {
  console.log(`action create: ${condition} condition toggle`);
  return {
    type: SET_CONDITION,
    payload: {
      condition: condition,
      isActive: isActive,
    }
  };
}

export function showTab(tab) {
  return {
    type: SHOW_TAB,
    payload: {
      tab: tab
    }
  }
}

export function toggleMenu() {
  return {
    type: TOGGLE_MENU,
    payload: {},
  };
}

export function addPoint(category) {
  return {
    type: ADD_POINT,
    payload: {
      category: category
    }
  }
}

export function spendPoint(category) {
  return {
    type: SPEND_POINT,
    payload: {
      category: category
    }
  }
}

export function markTest(name, category, mark, unmark = false) {
  mark = mark.toLowerCase();
  if (!['pass', 'fail', 'fate', 'persona'].includes(mark)) {
    throw new Error(`Bogus test mark: ${mark}`);
  }
  return {
    type: MARK_TEST,
    payload: {
      name,
      category,
      mark,
      unmark,
    }
  };
};

export function markTrait(name, increase) {
  return {
    type: MARK_TRAIT,
    payload: { name, increase },
  };
}

export const SKILL_DISPLAY_OPTIONS = {
  OPEN: 'OPEN',
  CORE: 'CORE',
  ALL: 'ALL',
};

export function setSkillDisplay(display) {
  if (!Object.keys(SKILL_DISPLAY_OPTIONS).includes(display)) {
    throw new Error(`Invalid skill display option ${display}`);
  }
  return {
    type: SET_SKILL_DISPLAY,
    payload: { display },
  };
};

export function resetCharacter() {
  return { type: RESET_CHARACTER };
};

export function importCharacter(character) {
  return {
    type: IMPORT_CHARACTER,
    payload: character,
  };
};

export function editCharacterBegin() {
  return { type: EDIT_CHARACTER_BEGIN };
};

export function editCharacterCommit(character) {
  return {
    type: EDIT_CHARACTER_COMMIT,
    payload: character,
  };
};

export function editCharacterRevert() {
  return { type: EDIT_CHARACTER_REVERT };
};

export function editCharacterProperty(value, ...path) {
  return {
    type: EDIT_CHARACTER_PROPERTY,
    payload: {
      value,
      path,
    },
  };
}

export function editCharacterAddField(category) {
  return {
    type: EDIT_CHARACTER_ADD_FIELD,
    payload: { category },
  };
};

export function editCharacterRemoveField(category, index) {
  return {
    type: EDIT_CHARACTER_REMOVE_FIELD,
    payload: { category, index }
  };
};