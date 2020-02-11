export const wiseReadyToAdvance = (wise, withMark) => {
  const advancement = {...wise.advancement};
  if (withMark) {
    advancement[withMark] = true;
  }

  return advancement.pass && advancement.fail && advancement.fate && advancement.persona;
}

export const newWise = (id, name = '') => {
  return {
    id, name,
    advancement: {
      pass: false,
      fail: false,
      fate: false,
      persona: false,
    },
  };
}