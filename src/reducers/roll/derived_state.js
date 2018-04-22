const InitialState = {
  summary: {
    type: 'obstacle',
    dice: 0,
    ob: 0,
    successes: 0,
    odds: 0,
    expected_margin: 0
  },
  details: []
}

const conditionDice = function(state, character, summary, details) {
  if (character.conditions.FRESH) {
    summary.dice += 1;
    details.push({
      effect: '+1D',
      source: 'Fresh'
    });
  }
  if (
    character.conditions.HUNGRY_AND_THIRSTY &&
    state.dice.info.isDisposition
  ) {
    summary.successes -= 1;
    details.push({
      effect: '-1S',
      source: 'Hungry and Thirsty',
      reason: 'because this is a disposition test'
    });
  }
  if (
    !['RESOURCES', 'CIRCLES'].includes(state.dice.info.skill) &&
    !state.dice.info.isRecovery
  ) {
    if (character.conditions.EXHAUSTED) {
      summary.successes -= 1;
      details.push({
        effect: '-1S',
        source: 'Exhausted'
      });
    }
    if (character.conditions.INJURED) {
      summary.dice -= 1;
      details.push({
        effect: '-1D',
        source: 'Injured'
      });
    }
    if (character.conditions.SICK) {
      summary.dice -= 1;
      details.push({
        effect: '-1D',
        source: 'Sick'
      });
    }
  }
}

const skillDice = function(state, character, summary, details) {
  const skillName = state.dice.info.skill;
  if (skillName) {
    let rating = 0;
    let source = ' rating';
    if (character && character.skills[skillName]) {
      rating = character.skills[skillName].rating;
      source = character.skills[skillName].name + source;
    } else if (character && character.abilities[skillName]) {
      rating = character.abilities[skillName].rating;
      source = character.abilities[skillName].name + source;
    }
    summary.dice += rating;
    details.push({
      effect: `+${rating}D`,
      source: source
    });
  }
}

const calculateDerivedRollState = function(state, character) {
  if (!character) {
    return InitialState;
  }
  const summary = {
    type: state.dice.info.isVersus ? 'versus' : 'obstacle',
    dice: 0,
    successes: 0,
    ob: state.dice.info.ob,
    odds: 50,
    expected_margin: 0,
  }
  const details = [];

  skillDice(state, character, summary, details);
  conditionDice(state, character, summary, details);

  // TODO: beginner's luck

  // TODO: dice from everything else

  // TODO: dice math - calculate a success chance

  console.log(details);

  return {
    summary: summary,
    details: details
  };
};

export default calculateDerivedRollState;
