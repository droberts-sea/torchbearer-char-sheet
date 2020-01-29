import diceMath from './dice_math';
import disabledOptions from './disabled_options';

const InitialState = {
  summary: {
    type: 'obstacle',
    dice: 0,
    ob: 0,
    addSuccesses: 0,
    odds: 0,
    expectedMargin: 0
  },
  details: [],
  disabledOptions: {
    natureInstead: true
  }
}

const preBLConditionDice = function (state, character, summary, details) {
  if (
    !['RESOURCES', 'CIRCLES'].includes(state.dice.info.skill) &&
    !state.dice.info.isRecovery
  ) {
    if (character.conditions.EXHAUSTED) {
      summary.addSuccesses -= 1;
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

export const skillDice = function (state, character, summary, details) {
  const skillName = state.dice.info.skill;
  if (!skillName || !character) {
    return;
  }

  const skill = character.skills[skillName];
  const ability = character.abilities[skillName];
  let rating;
  let source;

  // Assume not beginner's luck
  summary.isBeginnersLuck = false;

  // Figure out which skill or ability applies
  if (skill) {
    if (skill.open) {
      // open skill -> just use it
      rating = skill.rating;
      source = `${skill.name} rating`;

    } else if (state.dice.modifiers.natureInstead) {
      // non-open skill and the player has opted to use their nature instead
      const nature = character.abilities['NATURE'];
      rating = nature.rating;
      source = `Nature (instead of ${character.skills[skillName].name})`;

    } else {
      // non-open skill without nature -> beginner's luck
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

const modifierDice = function (state, character, summary, details) {
  const modifiers = state.dice.modifiers;
  if (modifiers.help && modifiers.help !== 0) {
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

const addPreBLDice = function (state, character, summary, details) {
  // "dice for the ability, wises, help, supplies and gear"
  preBLConditionDice(state, character, summary, details);
  skillDice(state, character, summary, details);
  modifierDice(state, character, summary, details);
}

const postBLConditionDice = function (state, character, summary, details) {
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
    summary.addSuccesses -= 1;
    details.push({
      effect: '-1S',
      source: 'Hungry and Thirsty',
      reason: 'because this is a disposition test'
    });
  }
}

const addPostBLDice = function (state, character, summary, details) {
  // "traits, persona points, tapped Nature, the fresh condition and any
  // other special or magic bonus dice"
  postBLConditionDice(state, character, summary, details);

  const modifiers = state.dice.modifiers;

  // traits (page 22)
  // There are three levels for each trait:
  //   Level 1 traits grant +1D to one roll per session.
  //   Level 2 traits grant +1D to two rolls per session.
  //   Level 3 traits grant +1s to a tied or successful test associated with the trait
  // If you use a trait against yourself, you earn a resource called a check
  //   Taking a -1D penalty to your roll earns you one check.
  //   Granting +2D to your opponent’s roll earns you two checks.
  //   Breaking a tie in your opponent’s favor earns two checks.
  if (modifiers.traitName && modifiers.traitEffect) {
    const trait = character.traits.find(trait => trait.name === modifiers.traitName);
    if (!trait) {
      throw new Error(`Asked for trait ${modifiers.traitName}, but character does not have that trait`);
    }

    switch (modifiers.traitEffect) {
      case 'benefit':
        if (trait.level < 3) {
          summary.dice += 1;
          details.push({
            effect: `+1D`,
            source: `${modifiers.traitName} trait (benefit)`
          });
        } else if (trait.level === 3) {
          summary.addSuccesses += 1;
          details.push({
            effect: `+1S`,
            source: `${modifiers.traitName} trait (benefit)`
          });
        }
        break;

      case 'penalty':
        summary.dice -= 1;
        details.push({
          effect: `-1D`,
          source: `${modifiers.traitName} trait (penalty)`
        });
        break;

      case 'opponent':
        if (!state.dice.info.isVersus) {
          throw new Error('Attempting to add opponent dice to a non-versus roll');
        }
        summary.opponentDice += 2;
        details.push({
          effect: `+2D for opponent`,
          source: `${modifiers.traitName} trait (aid opponent)`
        });
        break;

      default:
        throw new Error(`Invalid trait effect ${modifiers.traitEffect}`);
    }
  }

  // persona advantage (page 110)
  // You can spend up to three persona points on a single roll. Each point adds +1D to the roll
  // TODO: not if the ability is 0?
  if (modifiers.personaDice && modifiers.personaDice !== 0) {
    summary.dice += modifiers.personaDice;
    details.push({
      effect: `+${modifiers.personaDice}D`,
      source: 'Persona dice'
    });
  }

  // tapped nature (page 28)
  // You may tap your character’s Nature to perform a heroic act. By spending a persona point, you may add your current Nature rating to your ability or skill test (except Resources or Circles)
  //   If the test is within your character’s Nature and successful, then there is no tax.
  //   If the test is outside your character’s Nature and successful, Nature is taxed by one.
  //   If the test is failed, whether it was within or outside Nature, Nature is taxed by the margin of failure.
  if (state.dice.info.skill !== 'RESOURCES' && state.dice.info.skill !== 'CIRCLES' && modifiers.tapNature) {
    const nature = character.abilities.NATURE.rating
    summary.dice += nature;
    details.push({
      effect: `+${nature}D`,
      source: 'Tapping nature'
    });
  }
}


export const calculateDerivedRollState = function (state, character) {
  if (!character) {
    return InitialState;
  }
  const summary = {
    type: state.dice.info.isVersus ? 'versus' : 'obstacle',
    dice: 0,
    addSuccesses: 0,
    ob: state.dice.info.ob,
    opponentDice: 0,
    odds: 50,
    expectedMargin: 0,
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
