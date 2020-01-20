import diceMath from './dice_math';
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

const preBLConditionDice = function(state, character, summary, details) {
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

  // Assume false until proven otherwise
  summary.isBeginnersLuck = false;

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
      // We cut the rating in half in calculateDerivedRollState below
      summary.isBeginnersLuck = true;
      const blAbility = character.abilities[skill.beginnersLuck];
      rating = blAbility.rating;
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

const modifierDice = function(state, character, summary, details) {
  const modifiers = state.dice.modifiers;
  if (modifiers.help && modifiers.help != 0) {
    summary.dice += modifiers.help;
    details.push({
      effect: `+${modifiers.help}D`,
      source: 'Help'
    });
  }
  if (modifiers.supplies) {
    summary.dice += 1;
    details.push({
      effect: '+1D',
      source: 'Supplies'
    });
  }
  if (!modifiers.gear) {
    summary.dice -= 1;
    details.push({
      effect: '-1D',
      source: 'No Gear'
    })
  }
}

const addPreBLDice = function(state, character, summary, details) {
  // "dice for the ability, wises, help, supplies and gear"
  preBLConditionDice(state, character, summary, details);
  skillDice(state, character, summary, details);
  modifierDice(state, character, summary, details);
}

const postBLConditionDice = function(state, character, summary, details) {
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
}

const addPostBLDice = function(state, character, summary, details) {
  // "traits, persona points, tapped Nature, the fresh condition and any
  // other special or magic bonus dice"
  postBLConditionDice(state, character, summary, details);
}


export const calculateDerivedRollState = function(state, character) {
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
    isBeginnersLuck: false,
  }
  const details = [];

  // Beginner's Luck (page 26)
  // Total up the dice for the ability, wises, help, supplies and
  // gear, divide that by half and round up. Then add traits,
  // persona points, tapped Nature, the fresh condition and any
  // other special or magic bonus dice.
  //
  // My notes on conditions and BL:
  // Exhausted adds a factor, so doesn't matter
  // Injured and sick seem to subtract from the skill itself (language
  //   elsewhere confirms this), so that would be _before_ BL?
  // Fresh explicitly happens _after_ BL
  // Hungry and Thirsty affects the disposition, which implies
  // the test not the skill, so it would be after (same as fresh).
  addPreBLDice(state, character, summary, details);

  if (summary.isBeginnersLuck) {
    summary.dice = Math.ceil(summary.dice / 2);
    details.push({
      effect: 'Halved',
      source: "Beginner's Luck"
    });
  }

  addPostBLDice(state, character, summary, details);

  diceMath(state, character, summary, details);

  // console.log(details);

  return {
    summary: summary,
    details: details,
    disabledOptions: disabledOptions(state, character)
  };
};

export default calculateDerivedRollState;
