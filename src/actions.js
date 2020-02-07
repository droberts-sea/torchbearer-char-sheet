/*
* Action types
*/

// UI
export const SHOW_TAB = 'SHOW_TAB';

// INFO
export const SET_CONDITION = 'SET_CONDITION';
export const ADD_POINT = 'ADD_POINT';
export const SPEND_POINT = 'SPEND_POINT';

// STATS
export const MARK_TEST = 'MARK_TEST';
export const SKILL_COLLAPSE = 'SKILL_COLLAPSE';


/* Other Constants */

export const Tabs = {
  MENU: 'MENU',
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

export function markTest(name, category, mark, unmark=false) {
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

export function skillCollapse() {
  return {
    type: SKILL_COLLAPSE
  };
};
