export const ROLL_RESET = 'ROLL_RESET';
export const ROLL_ROLL_DICE = 'ROLL_ROLL_DICE';
export const ROLL_ACCEPT = 'ROLL_ACCEPT';
export const ROLL_COMMIT_RESULTS = 'ROLL_COMMIT_RESULTS';

export const ROLL_SET_INFO = 'ROLL_SET_INFO';
export const ROLL_SET_MODIFIER = 'ROLL_SET_MODIFIER';
export const ROLL_SET_REACTION = 'ROLL_SET_REACTION';
export const ROLL_SET_OUTCOME = 'ROLL_SET_OUTCOME';
export const ROLL_SET_WISE_ADVANCEMENT = 'ROLL_SET_WISE_ADVANCEMENT';
export const ROLL_GOTO_PAGE = 'ROLL_GOTO_PAGE';

export function rollReset() {
  return {
    type: ROLL_RESET,
    payload: {}
  };
};

export function rollRollDice() {
  return {
    type: ROLL_ROLL_DICE,
    payload: {}
  };
};

export function rollAccept(impact) {
  return {
    type: ROLL_ACCEPT,
    payload: impact,
  };
};

export function rollCommitResults(impact) {
  return {
    type: ROLL_COMMIT_RESULTS,
    payload: impact,
  };
};

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

export function rollSetReaction(prop, value) {
  // TODO validation
  return {
    type: ROLL_SET_REACTION,
    payload: {
      prop: prop,
      value: value
    }
  };
}

export function rollSetOutcome(prop, value) {
  return {
    type: ROLL_SET_OUTCOME,
    payload: {
      prop: prop,
      value: value,
    },
  };
}

export function rollSetWiseAdvancement(wiseName, prop, value) {
  // TODO validation
  return {
    type: ROLL_SET_WISE_ADVANCEMENT,
    payload: {
      wiseName, prop, value,
    },
  };
}

export const ROLL_PAGES = ['GATHER INFO', 'ADD DICE', 'READY', 'REACT', 'OUTCOME'];

export function rollGotoPage(pageIndex) {
  if (pageIndex < 0 ||
    pageIndex > ROLL_PAGES.length) {
    throw new Error(`Invalid page index ${pageIndex}`);
  }
  return {
    type: ROLL_GOTO_PAGE,
    payload: {
      pageIndex: pageIndex
    }
  };
}
