const ROLL_PAGES = ['GATHER INFO', 'ADD DICE', 'READY', 'RESULTS', 'AFTERMATH'];

const InitialRoll = {
  display: {
    currentPage: 'GATHER INFO',

    back: {
      target: undefined,
      enabled: false
    },

    forward: {
      target: 'ADD DICE',
      enabled: true
    },

    summary: {
      type: 'obstacle',
      dice: 0,
      ob: 0,
      odds: 0
    },
  },
  dice: {
    info: {
      type: 'obstacle', // obstacle or versus
      skill: undefined,
      ob: 3,
      inNature: false,
      isInstinct: false,
      isRecovery: false,
      isDisposition: false
    },

    modifiers: {
      natureInstead: false,
      tapNature: false,
      trait: {
        name: undefined,
        checks: 0
      },
      help: 0,
      addThroughPersona: 0
    },

    locked: false,

    rolledDice: [
      // { face: 3, rerolled: false }
    ],

    rerolls: {
      explodeSixes: false,
      ofCourseUsed: false,
      fateSpent: 0,
      personaSpent: 0
    }
  }
};

const reduceDisplay = function(state, action, character) {
  return state;
};

const reduceDice = function(state, action, character) {
  return state;
};

const calculateDerivedRollState = function(state, character) {
  const summary = {
    type: state.dice.info.type,
    dice: 0,
    ob: state.dice.info.ob,
    odds: 50
  }
  const details = [
  ]

  // TODO: dice from conditions

  const skillName = state.dice.info.skill;
  let rating = 0;
  if (character && character.skills[skillName]) {
    rating = character.skills[skillName].rating;
  } else if (character && character.abilities[skillName]) {
    rating = character.abilities[skillName].rating;
  }
  summary.dice += rating;
  details.push(`+${rating} from skill/ability rating`);

  // TODO: dice from everything else


  // TODO: dice math - calculate a success chance


  state.display = {
    ...state.display,
    summary: summary,
    details: details
  };
};

const rollReducer = function(state=InitialRoll, action, character) {
  state = {
    display: reduceDisplay(state.display, action, character),
    dice: reduceDice(state.dice, action, character),
  }
  calculateDerivedRollState(state, character);
  return state;
}

export default rollReducer;
