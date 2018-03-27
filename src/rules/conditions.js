export const Conditions = {
  FRESH: 'FRESH',
  HUNGRY_AND_THIRSTY: 'HUNGRY_AND_THIRSTY',
  ANGRY: 'ANGRY',
  AFRAID: 'AFRAID',
  EXHAUSTED: 'EXHAUSTED',
  INJURED: 'INJURED',
  SICK: 'SICK',
  DEAD: 'DEAD'
}

export const ConditionRules = {
  FRESH: {
    name: 'Fresh',
    default_state: true,
    effect: '+1D to all tests until other condition'
  },
  HUNGRY_AND_THIRSTY: {
    name: 'Hungry and Thirsty',
    default_state: false,
    effect: '-1 to disposition to any conflict'
  },
  ANGRY: {
    name: 'Angry',
    default_state: false,
    test: {
      skill: 'WILL',
      ob: 2
    },
    effect: "Can't use wises or beneficial traits"
  },
  AFRAID: {
    name: 'Afraid',
    default_state: false,
    test: {
      skill: 'WILL',
      ob: 3
    },
    effect: "Can't help or use Beginner's Luck"
  },
  EXHAUSTED: {
    name: 'Exhausted',
    default_state: false,
    test: {
      skill: 'HEALTH',
      ob: 3
    },
    effect: "Factor in all tests except Resources, Circles and recovery"
  },
  INJURED: {
    name: 'Injured',
    default_state: false,
    test: {
      skill: 'HEALTH',
      ob: 4
    },
    effect: "-1D to skills, Nature, Will and Health (but not recovery)"
  },
  SICK: {
    name: 'Sick',
    default_state: false,
    test: {
      skill: 'WILL',
      ob: 3
    },
    effect: "-1D to skills, Nature, Will and Health (but not recovery), can't practice, learn, advance"
  },
  DEAD: {
    name: 'Dead',
    default_state: false,
    effect: "May not use wises, test or help"
  }
};

export const RecoveryOrder = [
  Conditions.HUNGRY_AND_THIRSTY,
  Conditions.ANGRY,
  Conditions.AFRAID,
  Conditions.EXHAUSTED,
  Conditions.INJURED,
  Conditions.SICK
];

export const DisplayOrder = [
  Conditions.FRESH,
  ...RecoveryOrder,
  Conditions.DEAD
];

// Page 78
export const GrindOrder = [
  Conditions.HUNGRY_AND_THIRSTY,
  Conditions.EXHAUSTED,
  Conditions.ANGRY,
  Conditions.SICK,
  Conditions.INJURED,
  Conditions.AFRAID,
  Conditions.DEAD
];
