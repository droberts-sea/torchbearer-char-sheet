/*
* Action types
*/

export const TOGGLE_CONDITION = 'TOGGLE_CONDITION';
export const SHOW_TAB = 'SHOW_TAB';

/* Other Constants */

export const Tabs = {
  BIO: 'BIO',
  STATS: 'STATS',
  INFO: 'INFO',
  GEAR: 'GEAR',
  ROLL: 'ROLL'
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
