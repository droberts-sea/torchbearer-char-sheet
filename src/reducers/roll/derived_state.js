import math from 'mathjs';
import _ from 'underscore';

import disabledOptions from './disabled_options';

const InitialState = {
  summary: {
    type: 'obstacle',
    dice: 0,
    ob: 0,
    successes: 0,
    odds: 0,
    expected_margin: 0
  },
  details: [],
  disabledOptions: {
    natureInstead: true
  }
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

export const skillDice = function(state, character, summary, details) {
  const skillName = state.dice.info.skill;
  if (!skillName || !character) {
    return;
  }

  const skill = character.skills[skillName];
  const ability = character.abilities[skillName];
  let rating;
  let source;

  // Figure out which skill or ability applies
  if (state.dice.modifiers.natureInstead) {
    const nature = character.abilities['NATURE'];
    rating = nature.rating;
    source = `Nature (instead of ${character.skills[skillName].name})`;

  } else if (skill) {
    if (skill.open) {
      rating = skill.rating;
      source = `${skill.name} rating`;

    } else {
      // TODO: this should cut more than just skill dice in half.
      const blAbility = character.abilities[skill.beginnersLuck];
      rating = Math.ceil(blAbility.rating / 2);
      source = `${blAbility.name} (BL for ${skill.name})`;
    }

  } else if (ability) {
    rating = ability.rating;
    source = `${ability.name} rating`;
    
  } else {
    // Nothing to do
    return;
  }

  summary.dice += rating;
  details.push({
    effect: `+${rating}D`,
    source: source
  });
}

export const expectedMargin = function(summary) {
  const expected_success = (summary.dice / 2.0) + summary.successes;
  let expected_bar;
  if (summary.type === 'versus') {
    expected_bar = summary.ob / 2;
  } else {
    expected_bar = summary.ob;
  }
  return expected_success - expected_bar;
}

export const oddsOfSuccess = function(summary) {
  if (summary.type === 'versus') {
    // TODO: versus tests - competing bernoulli processes
    return NaN;
  }

  if (summary.ob - summary.successes <= 0) {
    return 1;
  }

  // Sum from i=ob to number of dice d of
  //   (d choose i) * .5^i * .5^(d-i)
  const dice = summary.dice;
  const base = summary.ob - summary.successes;
  return math.sum(_.times(1 + dice - base, (j) => {
    const i = j + base;
    return math.combinations(dice, i) * (.5 ** i) * (.5 ** (dice-i));
  }));
}

const diceMath = function(state, character, summary) {
  summary.expected_margin = expectedMargin(summary);
  summary.odds = oddsOfSuccess(summary);
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

  diceMath(state, character, summary, details);

  console.log(details);

  return {
    summary: summary,
    details: details,
    disabledOptions: disabledOptions(state, character)
  };
};

export default calculateDerivedRollState;
