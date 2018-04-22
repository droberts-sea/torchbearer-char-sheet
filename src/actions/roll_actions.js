export const ROLL_SET_PROPERTY = 'ROLL_SET_PROPERTY';

export const ROLL_PROPERTIES = {
  IS_VERSUS: 'IS_VERSUS',
  OB: 'OB',
  SKILL: 'SKILL',
  IN_NATURE: 'IN_NATURE',
  IS_INSTINCT: 'IS_INSTINCT',
  IS_RECOVERY: 'IS_RECOVERY',
  IS_DISPOSITION: 'IS_DISPOSITION'
};

export function rollSetProperty(prop, value) {
  // TODO Validation
  return {
    type: ROLL_SET_PROPERTY,
    payload: {
      prop: prop,
      value: value
    }
  };
};
