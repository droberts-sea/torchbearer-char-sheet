import { wiseReadyToAdvance } from "../../rules/wises";
import { skillReadyToAdvance } from "../../rules/skills";

// Thought: maybe you could consolidate all the impact effects into a single type?

const points = (roll) => {
  const points = {
    fate: [],
    persona: [],
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
      source: 'Ancestral Insight (tap nature)',
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

// markEffect = {
//   name: "...",
//   category: "wises" | "skills" | "ablities",
//   mark: "pass" | "fail" | "fate" | "persona",
//   advance: bool,
//   [alreadyMarked: bool],
// }

const wises = (roll, character) => {
  const reactions = roll.results.reactions;

  const effects = [];

  if (reactions.deeperUnderstandingUsed) {
    const wise = character.wises.find(w => w.name === reactions.deeperUnderstandingWise);
    if (wise) {
      const effect = {
        category: 'wises',
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
        category: 'wises',
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

// Resources can also be taxed but never automatically, so this function is OK to be nature-specific.
const taxNature = (roll, character, postRoll) => {
  let tax;

  // Taxing Nature (pg 27)
  // If you use Nature in a situation outside of your Nature descriptors and fail the roll, the current rating is reduced by the margin of failure (to a minimum rating of 0).
  if (roll.dice.modifiers.natureInstead &&
    !roll.dice.info.inNature &&
    postRoll.outcome === 'fail') {
    tax = {
      source: 'Faking It (rolling with Nature) on a failed test outside Nature',
      total: postRoll.margin,
    };

    // No double tax! Double-Tapping Nature (pg 28):
    // If you’re acting within your Nature, you may test your Nature... and use a persona point to add your Nature rating on top of that roll.
    // Essentially, you’re doubling your Nature. However, if you fail this test, your Nature is taxed as per the rule in Tapping Your Nature.
  } else if (roll.dice.modifiers.tapNature) {
    // Tap nature and tax (page 28)
    //   If the test is within your character’s Nature and successful, then there is no tax.
    //   If the test is outside your character’s Nature and successful, Nature is taxed by one.
    //   If the test is failed, whether it was within or outside Nature, Nature is taxed by the margin of failure.
    if (postRoll.outcome === 'fail') {
      tax = {
        source: 'Ancestral Insight (tap Nature) on a failed test',
        total: postRoll.margin,
      };
    } else if (!roll.dice.info.inNature) {
      tax = {
        source: 'Ancestral Insight (tap Nature) on a successful test outside Nature',
        total: 1,
      };
    }
  }

  if (tax) {
    tax.willDeplete = tax.total >= character.abilities.NATURE.rating;
  }

  return tax;
}

const skillAbility = (roll, character, mark, taxNature) => {
  let skill;
  const effect = {
    name: roll.dice.info.skill,
  };

  if (skill = character.skills[effect.name]) { // eslint-disable-line no-cond-assign
    effect.category = 'skills';

    // Once you use Beginner’s Luck... Check off one of the Pass bubbles—it doesn’t matter if you passed or failed that particular test. (pg 30)
    if (!character.skills[effect.name].open && mark === 'fail') {
      effect.markComment = "beginner's luck always marks pass";
      mark = 'pass';
    }

  } else if (skill = character.abilities[effect.name]) { // eslint-disable-line no-cond-assign
    effect.category = 'abilities';

  } else {
    throw new Error(`Invalid skill/ability name ${effect.name}`);
  }

  effect.mark = mark;
  effect.advance = skillReadyToAdvance(skill, character.abilities.NATURE.untaxed, mark);

  // Account for tax (if skill is nature)
  // The source book is hazy on whether tax or advancement happens first, so I made an Engineering Decision to tax first (it's meaner)
  // See https://www.reddit.com/r/Torchbearer/comments/f02avw/tax_or_advance_nature_which_comes_first/
  if (taxNature && taxNature.willDeplete) {
    if (effect.name === 'NATURE') {
      // If tax depletes max nature to 1, a single pass (this roll) is enough to advance. You clean the slate (remove all marks, pg 104) after depleting, so if max nature is more than 1 after depletion or this isn't a pass roll then no advancement.
      effect.advance = character.abilities.NATURE.untaxed <= 2 && mark === 'pass';

    } else if (!skill.open) {
      // Tax / depletion and beginner's luck advancement
      // If tax happens first, then BL advancement should use the depleted nature value
      const depletedNature = character.abilities.NATURE.untaxed - 1
      effect.advance = skillReadyToAdvance(skill, depletedNature, mark);
    }
  }

  return effect;
}

const impact = (roll, character, postRoll) => {
  const tax = taxNature(roll, character, postRoll);
  const impact = {
    points: points(roll),
    beneficialTrait: beneficialTrait(roll, character),
    wises: wises(roll, character),
    taxNature: tax,
    skill: skillAbility(roll, character, postRoll.outcome, tax),
  };

  return impact;
};

export default impact;