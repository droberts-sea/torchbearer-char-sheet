export const ROLL_SET_PROPERTY = 'ROLL_SET_PROPERTY';
export const ROLL_GOTO_PAGE = 'ROLL_GOTO_PAGE';

const ROLL_PROPERTIES = {
  ob: 'OB',
  skill: 'SKILL',
  inNature: 'IN_NATURE',
  isVersus: 'IS_VERSUS',
  isInstinct: 'IS_INSTINCT',
  isRecovery: 'IS_RECOVERY',
  isDisposition: 'IS_DISPOSITION'
};

export function rollSetProperty(prop, value) {
  // TODO Validation
  if (!Object.keys(ROLL_PROPERTIES).includes(prop)) {
    throw new Error(`Invalid roll property: ${prop}`);
  }
  return {
    type: ROLL_SET_PROPERTY,
    payload: {
      prop: prop,
      value: value
    }
  };
};

export const ROLL_PAGES = ['GATHER INFO', 'ADD DICE', 'READY', 'RESULTS', 'AFTERMATH'];

export function rollGotoPage(page) {
  if (!ROLL_PAGES.includes(page)) {
    throw new Error(`Invalid page ${page}`);
  }
  return {
    type: ROLL_GOTO_PAGE,
    payload: {
      page: page
    }
  };
}
