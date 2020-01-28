export const ROLL_DO_OPERATION = 'ROLL_OPERATION';
export const ROLL_SET_INFO = 'ROLL_SET_INFO';
export const ROLL_SET_MODIFIER = 'ROLL_SET_MODIFIER';
export const ROLL_GOTO_PAGE = 'ROLL_GOTO_PAGE';

const ROLL_OPERATIONS = [
  'RESET',
  'ROLL_DICE',
  'COMMIT',
];

export function rollDoOperation(op) {
  if (!ROLL_OPERATIONS.includes(op)) {
    throw new Error(`Invalid roll operation: ${op}`);
  }
  return {
    type: ROLL_DO_OPERATION,
    payload: {
      operation: op
    }
  };
}

const ROLL_INFO_PROPS = [
  'ob',
  'skill',
  'inNature',
  'isVersus',
  'isInstinct',
  'isRecovery',
  'isDisposition'
];

export function rollSetInfo(prop, value) {
  // TODO Validation
  if (!ROLL_INFO_PROPS.includes(prop)) {
    throw new Error(`Invalid roll info property: ${prop}`);
  }
  return {
    type: ROLL_SET_INFO,
    payload: {
      prop: prop,
      value: value
    }
  };
}

const ROLL_MODIFIER_PROPS = [
  'natureInstead',
  'tapNature',
  'traitName',
  'traitEffect',
  'help',
  'personaDice',
  'supplies',
  'gear',
];

export function rollSetModifier(prop, value) {
  if (!ROLL_MODIFIER_PROPS.includes(prop)) {
    throw new Error(`Invalid roll modifier property: ${prop}`);
  }
  return {
    type: ROLL_SET_MODIFIER,
    payload: {
      prop: prop,
      value: value
    }
  }
}

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
