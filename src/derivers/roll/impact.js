import { wiseReadyToAdvance } from "../../rules/wises";

// Thought: maybe you could consolidate all the impact effects into a single type?

const points = (roll) => {
  const points = {
    persona: [],
    fate: [],
    checks: [],
    total: {
      fate: 0,
      persona: 0,
      checks: 0,
    },
  };

  if (roll.dice.modifiers.personaDice) {
    points.persona.push({
      source: 'Persona Dice',
      effect: roll.dice.modifiers.personaDice,
    });
  }

  if (roll.dice.modifiers.tapNature) {
    points.persona.push({
      source: 'Tap Nature',
      effect: 1,
    });
  }

  if (roll.results.reactions.deeperUnderstandingUsed) {
    points.fate.push({
      source: 'Deeper Understanding',
      effect: 1,
    });
  }

  if (roll.results.reactions.ofCourseUsed) {
    points.persona.push({
      source: 'Of Course',
      effect: 1,
    });
  }

  if (roll.results.reactions.explodeSixes) {
    points.fate.push({
      source: 'Fate for Luck',
      effect: 1,
    });
  }

  if (roll.dice.modifiers.traitName) {
    if (roll.dice.modifiers.traitEffect === 'penalty') {
      points.checks.push({
        source: `${roll.dice.modifiers.traitName} trait used against you`,
        effect: 1,
      });

    } else if (roll.dice.info.isVersus &&
      roll.dice.modifiers.traitEffect === "opponent") {
      points.checks.push({
        source: `${roll.dice.modifiers.traitName} trait used to aid opponent`,
        effect: 2,
      });

    }
  }

  points.total = {
    fate: points.fate.reduce((m, f) => m + f.effect, 0),
    persona: points.persona.reduce((m, p) => m + p.effect, 0),
    checks: points.checks.reduce((m, c) => m + c.effect, 0),
  }

  return points;
};

const beneficialTrait = (roll, character) => {
  const trait = character.traits.find(t => t.name === roll.dice.modifiers.traitName);
  if (trait && trait.level < 3 &&
    roll.dice.modifiers.traitEffect === 'benefit') {
    return roll.dice.modifiers.traitName;
  }
  return undefined;
}

const wises = (roll, character) => {
  const reactions = roll.results.reactions;

  const effects = [];

  if (reactions.deeperUnderstandingUsed) {
    const wise = character.wises.find(w => w.name === reactions.deeperUnderstandingWise);
    if (wise) {
      const effect = {
        name: reactions.deeperUnderstandingWise,
        mark: 'fate',
        alreadyMarked: wise.advancement.fate,
      };
      effect.advance = !effect.alreadyMarked && wiseReadyToAdvance(wise, 'fate');
      effects.push(effect);
    }
  }

  if (reactions.ofCourseUsed) {
    const wise = character.wises.find(w => w.name === reactions.ofCourseWise);
    if (wise) {
      const effect = {
        name: reactions.ofCourseWise,
        mark: 'persona',
        alreadyMarked: wise.advancement.persona,
      }
      effect.advance = !effect.alreadyMarked && wiseReadyToAdvance(wise, 'persona');
      effects.push(effect);
    }
  }

  return effects;
}

const skillAbility = (roll, character) => {
  const effect = {
    name: roll.info.skill,
    // mark: 
  };

  if (character.skills[effect.name]) {
    effect.category = 'skills';
  } else if (character.abilities[effect.name]) {
    effect.category = 'abilities';
  } else {
    throw new Error(`Invalid skill/ability name ${effect.name}`);
  }
}

const impact = (roll, character) => {
  const impact = {
    points: points(roll),
    beneficialTrait: beneficialTrait(roll, character),
    wises: wises(roll, character),
    // skill: skillAbility(roll, character),
    // ...skillsAndAbilities(roll),

  };

  return impact;
};

export default impact;