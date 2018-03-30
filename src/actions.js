/*
* Action types
*/

export const TOGGLE_CONDITION = 'TOGGLE_CONDITION';
export const SHOW_TAB = 'SHOW_TAB';
export const ADD_POINT = 'ADD_POINT';
export const SPEND_POINT = 'SPEND_POINT';

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

export function toggleCondition(condition) {
  console.log(`action create: ${condition} condition toggle`);
  return {
    type: TOGGLE_CONDITION,
    payload: {
      condition: condition
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
