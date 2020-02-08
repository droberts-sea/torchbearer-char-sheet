import impact from '../impact';

import mockRoll from '../../../mock/roll';
import mockCharacter from '../../../mock/character';
import postRollDerived from '../post_roll';
import preRollDerived from '../pre_roll';
import { deepCopy } from '../../../mock/util';

const mockPostRoll = postRollDerived(
  mockRoll.results.rolledDice,
  preRollDerived(mockRoll, mockCharacter)
);

describe('resources', () => {
  let roll;
  beforeEach(() => {
    roll = deepCopy(mockRoll);
  })
  it('runs without crashing', () => {
    impact(mockRoll, mockCharacter, mockPostRoll);
  });

  describe('points', () => {
    it('tracks persona spent for extra dice', () => {
      roll.dice.modifiers.personaDice = 0;
      const before_impact = impact(roll, mockCharacter, mockPostRoll);

      roll.dice.modifiers.personaDice = 2;
      const after_impact = impact(roll, mockCharacter, mockPostRoll);

      expect(after_impact.points.total.persona).toEqual(before_impact.points.total.persona + 2);
    });

    it('Adds a persona for tapping nature', () => {
      roll.dice.modifiers.tapNature = false;
      const before_impact = impact(roll, mockCharacter, mockPostRoll);

      roll.dice.modifiers.tapNature = true;
      const after_impact = impact(roll, mockCharacter, mockPostRoll);

      expect(after_impact.points.total.persona).toEqual(before_impact.points.total.persona + 1);
    });

    it('Adds a fate for deeper understanding', () => {
      roll.results.reactions.deeperUnderstandingUsed = false;
      const before_impact = impact(roll, mockCharacter, mockPostRoll);

      roll.results.reactions.deeperUnderstandingUsed = true;
      const after_impact = impact(roll, mockCharacter, mockPostRoll);

      expect(after_impact.points.total.fate).toEqual(before_impact.points.total.fate + 1);
    });

    it('Adds a persona for of course', () => {
      roll.results.reactions.ofCourseUsed = false;
      const before_impact = impact(roll, mockCharacter, mockPostRoll);

      roll.results.reactions.ofCourseUsed = true;
      const after_impact = impact(roll, mockCharacter, mockPostRoll);

      expect(after_impact.points.total.persona).toEqual(before_impact.points.total.persona + 1);
    });

    it('Adds a fate for "fate for luck"', () => {
      roll.results.reactions.explodeSixes = false;
      const before_impact = impact(roll, mockCharacter, mockPostRoll);

      roll.results.reactions.explodeSixes = true;
      const after_impact = impact(roll, mockCharacter, mockPostRoll);

      expect(after_impact.points.total.fate).toEqual(before_impact.points.total.fate + 1);
    });

    it('adds one check for penalty trait use', () => {
      roll.dice.modifiers.traitName = undefined;
      roll.dice.modifiers.traitEffect = undefined;
      const before_impact = impact(roll, mockCharacter, mockPostRoll);

      roll.dice.modifiers.traitName = "Firey";
      roll.dice.modifiers.traitEffect = "penalty";
      const after_impact = impact(roll, mockCharacter, mockPostRoll);

      expect(after_impact.points.total.checks).toEqual(before_impact.points.total.checks + 1);
    });

    it('adds two checks for aid opponent trait use', () => {
      roll.dice.info.isVersus = true;
      roll.dice.modifiers.traitName = undefined;
      roll.dice.modifiers.traitEffect = undefined;
      const before_impact = impact(roll, mockCharacter, mockPostRoll);

      roll.dice.modifiers.traitName = "Firey";
      roll.dice.modifiers.traitEffect = "opponent";
      const after_impact = impact(roll, mockCharacter, mockPostRoll);

      expect(after_impact.points.total.checks).toEqual(before_impact.points.total.checks + 2);
    });
  });

  describe('beneficial trait', () => {
    it('records use of a beneficial trait', () => {
      roll.dice.modifiers.traitName = undefined;
      roll.dice.modifiers.traitEffect = undefined;
      const before_impact = impact(roll, mockCharacter, mockPostRoll);
      expect(before_impact.beneficialTrait).toBe(undefined);

      roll.dice.modifiers.traitName = "Firey";
      roll.dice.modifiers.traitEffect = "benefit";
      const after_impact = impact(roll, mockCharacter, mockPostRoll);
      expect(after_impact.beneficialTrait).toBe(roll.dice.modifiers.traitName);
    });

    it('ignores level 3 traits', () => {
      const traitName = 'Curious';
      expect(mockCharacter.traits.find(t => t.name === traitName).level).toEqual(3);

      roll.dice.modifiers.traitName = traitName;
      roll.dice.modifiers.traitEffect = 'benefit';
      const after_impact = impact(roll, mockCharacter, mockPostRoll);
      expect(after_impact.beneficialTrait).toBe(undefined);
    })
  });

  describe('wises', () => {
    it('marks use of deeper understanding', () => {
      const wiseName = mockCharacter.wises[0].name;

      roll.results.reactions.deeperUnderstandingUsed = false;
      roll.results.reactions.deeperUnderstandingWise = undefined;
      const before_impact = impact(roll, mockCharacter, mockPostRoll);
      expect(before_impact.wises.length).toEqual(0);

      roll.results.reactions.deeperUnderstandingUsed = true;
      roll.results.reactions.deeperUnderstandingWise = wiseName;
      const after_impact = impact(roll, mockCharacter, mockPostRoll);
      expect(after_impact.wises.length).toEqual(1);
      expect(after_impact.wises[0].name).toEqual(wiseName);
      expect(after_impact.wises[0].mark).toEqual('fate');
    });

    it('marks use of of course', () => {
      const wiseName = mockCharacter.wises[0].name;

      roll.results.reactions.ofCourseUsed = false;
      roll.results.reactions.ofCourseWise = undefined;
      const before_impact = impact(roll, mockCharacter, mockPostRoll);
      expect(before_impact.wises.length).toEqual(0);

      roll.results.reactions.ofCourseUsed = true;
      roll.results.reactions.ofCourseWise = wiseName;
      const after_impact = impact(roll, mockCharacter, mockPostRoll);
      expect(after_impact.wises.length).toEqual(1);
      expect(after_impact.wises[0].name).toEqual(wiseName);
      expect(after_impact.wises[0].mark).toEqual('persona');
    });

    it('detects when a wise has already been used for deeper understanding', () => {
      const character = deepCopy(mockCharacter);
      const wise = character.wises[0];

      roll.results.reactions.deeperUnderstandingUsed = true;
      roll.results.reactions.deeperUnderstandingWise = wise.name;
      wise.advancement.fate = false;

      const before_impact = impact(roll, character, mockPostRoll);
      expect(before_impact.wises[0].alreadyMarked).toBeFalsy();

      wise.advancement.fate = true;
      const after_impact = impact(roll, character, mockPostRoll);
      expect(after_impact.wises[0].alreadyMarked).toBeTruthy();
    });

    it('detects when a wise has already been used for of course', () => {
      const character = deepCopy(mockCharacter);
      const wise = character.wises[0];

      roll.results.reactions.ofCourseUsed = true;
      roll.results.reactions.ofCourseWise = wise.name;
      wise.advancement.persona = false;

      const before_impact = impact(roll, character, mockPostRoll);
      expect(before_impact.wises[0].alreadyMarked).toBeFalsy();

      wise.advancement.persona = true;
      const after_impact = impact(roll, character, mockPostRoll);
      expect(after_impact.wises[0].alreadyMarked).toBeTruthy();
    });

    it('detects when a wise is ready for advancement through DU', () => {
      const character = deepCopy(mockCharacter);
      const wise = character.wises[0];

      roll.results.reactions.deeperUnderstandingUsed = true;
      roll.results.reactions.deeperUnderstandingWise = wise.name;
      wise.advancement.pass = true;
      wise.advancement.fail = true;
      wise.advancement.persona = false;
      wise.advancement.fate = false;

      const before_impact = impact(roll, character, mockPostRoll);
      expect(before_impact.wises[0].advance).toBeFalsy();

      wise.advancement.persona = true;
      const after_impact = impact(roll, character, mockPostRoll);
      expect(after_impact.wises[0].advance).toBeTruthy();
    });

    it('detects when a wise is ready for advancement through OfC', () => {
      const character = deepCopy(mockCharacter);
      const wise = character.wises[0];

      roll.results.reactions.ofCourseUsed = true;
      roll.results.reactions.ofCourseWise = wise.name;
      wise.advancement.pass = true;
      wise.advancement.fail = true;
      wise.advancement.persona = false;
      wise.advancement.fate = false;

      const before_impact = impact(roll, character, mockPostRoll);
      expect(before_impact.wises[0].advance).toBeFalsy();

      wise.advancement.fate = true;
      const after_impact = impact(roll, character, mockPostRoll);
      expect(after_impact.wises[0].advance).toBeTruthy();
    });
  });

  describe('skill', () => {
    it('tracks the skill/ability name', () => {
      const skillName = Object.keys(mockCharacter.skills)[0]
      roll.dice.info.skill = skillName;

      const skillImpact = impact(roll, mockCharacter, mockPostRoll);
      expect(skillImpact.skill.name).toEqual(skillName);

      const abilityName = Object.keys(mockCharacter.abilities)[0]
      roll.dice.info.skill = abilityName;

      const abilityImpact = impact(roll, mockCharacter, mockPostRoll);
      expect(abilityImpact.skill.name).toEqual(abilityName);
    });

    it('correctly identifies skills vs abilities', () => {
      const skillName = Object.keys(mockCharacter.skills)[0]
      roll.dice.info.skill = skillName;

      const skillImpact = impact(roll, mockCharacter, mockPostRoll);
      expect(skillImpact.skill.category).toEqual('skills');

      const abilityName = Object.keys(mockCharacter.abilities)[0]
      roll.dice.info.skill = abilityName;

      const abilityImpact = impact(roll, mockCharacter, mockPostRoll);
      expect(abilityImpact.skill.category).toEqual('abilities');
    });

    it('tracks whether the mark is pass or fail', () => {
      const postRoll = deepCopy(mockPostRoll);

      postRoll.outcome = 'fail'
      let testImpact = impact(roll, mockCharacter, postRoll);
      expect(testImpact.skill.mark).toEqual('fail');

      postRoll.outcome = 'pass'
      testImpact = impact(roll, mockCharacter, postRoll);
      expect(testImpact.skill.mark).toEqual('pass');
    });

    it('always marks pass for a BL skill', () => {
      const character = deepCopy(mockCharacter);
      const postRoll = deepCopy(mockPostRoll);

      const skillName = Object.keys(character.skills)[0];
      roll.dice.info.skill = skillName;
      character.skills[skillName].open = false;
      postRoll.outcome = 'fail'

      const testImpact = impact(roll, mockCharacter, postRoll);
      expect(testImpact.skill.mark).toEqual('pass');
    })

    it('tracks when a skill is not ready to advance', () => {
      const character = deepCopy(mockCharacter);
      const postRoll = deepCopy(mockPostRoll);

      const skillName = Object.keys(character.skills)[0];
      roll.dice.info.skill = skillName;

      const skill = character.skills[skillName]
      skill.open = true;
      skill.advancement.pass = skill.rating - 2;
      skill.advancement.fail = skill.rating - 1;
      postRoll.outcome = 'pass';

      const testImpact = impact(roll, character, postRoll);
      expect(testImpact.skill.advance).toBeFalsy();
    });

    it('tracks when a skill is ready to advance', () => {
      const character = deepCopy(mockCharacter);
      const postRoll = deepCopy(mockPostRoll);

      const skillName = Object.keys(character.skills)[0];
      roll.dice.info.skill = skillName;

      const skill = character.skills[skillName]
      skill.open = true;
      skill.advancement.pass = skill.rating - 1;
      skill.advancement.fail = skill.rating - 1;
      postRoll.outcome = 'pass';

      const testImpact = impact(roll, character, postRoll);
      expect(testImpact.skill.advance).toBeTruthy();
    });

    it('does not mark NATURE for advancement if tax would deplete it and the new untaxed value is greater than 1', () => {
      roll.dice.info.skill = 'NATURE';
      roll.dice.info.inNature = false;
      roll.dice.modifiers.tapNature = true;

      const character = deepCopy(mockCharacter);
      const nature = character.abilities.NATURE;
      nature.rating = 1;
      nature.untaxed = 4;
      nature.advancement.pass = 3;
      nature.advancement.fail = 3;

      const postRoll = deepCopy(mockPostRoll);
      postRoll.outcome = 'pass';

      const testImpact = impact(roll, character, postRoll);
      expect(testImpact.taxNature.willDeplete).toBeTruthy();
      expect(testImpact.skill.advance).toBeFalsy();
    });

    it('does mark NATURE for advancement if tax would deplete it and the new untaxed value is 1', () => {
      roll.dice.info.skill = 'NATURE';
      roll.dice.info.inNature = false;
      roll.dice.modifiers.tapNature = true;

      const character = deepCopy(mockCharacter);
      const nature = character.abilities.NATURE;
      nature.rating = 1;
      nature.untaxed = 2;

      const postRoll = deepCopy(mockPostRoll);
      postRoll.outcome = 'pass';

      const testImpact = impact(roll, character, postRoll);
      expect(testImpact.taxNature.willDeplete).toBeTruthy();
      expect(testImpact.skill.advance).toBeTruthy();
    });

    it('does mark BL skill for advancement if tax would deplete nature down to the number of marks', () => {
      const character = deepCopy(mockCharacter);
      const postRoll = deepCopy(mockPostRoll);

      const skillName = Object.keys(character.skills)[0];
      roll.dice.info.skill = skillName;
      roll.dice.info.inNature = false;
      
      character.skills[skillName].open = false;
      character.skills[skillName].advancement.pass = 2;
      character.skills[skillName].advancement.fail = 0;
      character.abilities.NATURE.rating = 1;
      character.abilities.NATURE.untaxed = 4;
      
      postRoll.outcome = 'pass';
      
      // No tax -> no advance
      roll.dice.modifiers.tapNature = false;
      let testImpact = impact(roll, character, postRoll);
      expect(testImpact.taxNature).toBe(undefined);
      expect(testImpact.skill.advance).toBeFalsy();

      // Yes tax -> yes advance
      roll.dice.modifiers.tapNature = true;
      testImpact = impact(roll, character, postRoll);
      expect(testImpact.taxNature.willDeplete).toBeTruthy();
      expect(testImpact.skill.advance).toBeTruthy();

      // Increase untaxed nature -> no advance (not enough marks)
      character.abilities.NATURE.untaxed = 5;
      testImpact = impact(roll, character, postRoll);
      expect(testImpact.taxNature.willDeplete).toBeTruthy();
      expect(testImpact.skill.advance).toBeFalsy();
    });
  });

  describe('taxNature', () => {
    it('does not tax nature for a typical roll', () => {
      roll.dice.modifiers.natureInstead = false;
      roll.dice.modifiers.tapNature = false;
      const testImpact = impact(roll, mockCharacter, mockPostRoll);

      expect(testImpact.taxNature).toBe(undefined);
    });

    it("Doesn't double tax", () => {
      roll.dice.info.inNature = false;
      roll.dice.modifiers.natureInstead = true;
      roll.dice.modifiers.tapNature = true;

      const postRoll = deepCopy(mockPostRoll);
      postRoll.outcome = 'fail';
      postRoll.ob = 5;
      postRoll.totalSuccesses = 3;
      postRoll.margin = 2;


      const testImpact = impact(roll, mockCharacter, postRoll);

      expect(testImpact.taxNature.total).toEqual(2);
    });

    it('detects when nature will be depleted', () => {
      roll.dice.info.inNature = false;
      roll.dice.modifiers.natureInstead = true;

      const postRoll = deepCopy(mockPostRoll);
      postRoll.outcome = 'fail';
      postRoll.ob = 5;
      postRoll.totalSuccesses = 3;
      postRoll.margin = 2;

      const character = deepCopy(mockCharacter);

      character.abilities.NATURE.rating = 3;
      const before_impact = impact(roll, character, postRoll);
      expect(before_impact.taxNature.willDeplete).toBeFalsy();

      character.abilities.NATURE.rating = 2;
      const after_impact = impact(roll, character, postRoll);
      expect(after_impact.taxNature.willDeplete).toBeTruthy();
    });

    describe('faking it (nature instead of BL)', () => {
      let postRoll;
      beforeEach(() => {
        roll.dice.info.inNature = false;
        roll.dice.modifiers.natureInstead = true;
        roll.dice.modifiers.tapNature = false;

        postRoll = deepCopy(mockPostRoll);
        postRoll.outcome = 'fail';
        postRoll.ob = 5;
        postRoll.totalSuccesses = 3;
        postRoll.margin = 2;
      });

      it('Taxes nature by the margin of failure on a failed roll if the task is not in the characters nature', () => {
        const testImpact = impact(roll, mockCharacter, postRoll);

        expect(testImpact.taxNature.total).toEqual(2);
      });

      it('Does not tax nature on a passed roll', () => {
        roll.dice.modifiers.natureInstead = false;
        const testImpact = impact(roll, mockCharacter, postRoll);

        expect(testImpact.taxNature).toBe(undefined);
      });

      it('Does not tax nature on a failed roll within nature', () => {
        roll.dice.info.inNature = true;
        const testImpact = impact(roll, mockCharacter, postRoll);

        expect(testImpact.taxNature).toBe(undefined);
      });
    });

    describe('Ancestral insight (tap nature)', () => {
      let postRoll;
      beforeEach(() => {
        roll.dice.modifiers.natureInstead = false;
        roll.dice.modifiers.tapNature = true;

        postRoll = deepCopy(mockPostRoll);
      });

      it('taxes by margin of failure on failed rolls', () => {
        postRoll.outcome = 'fail';
        postRoll.ob = 5;
        postRoll.totalSuccesses = 3;
        postRoll.margin = 2;

        const testImpact = impact(roll, mockCharacter, postRoll);

        expect(testImpact.taxNature.total).toEqual(2);
      });

      it('taxes by 1 on a successful roll outside nature', () => {
        roll.dice.info.inNature = false;

        postRoll.outcome = 'success';
        postRoll.ob = 3;
        postRoll.totalSuccesses = 5;
        postRoll.margin = 2;

        const testImpact = impact(roll, mockCharacter, postRoll);

        expect(testImpact.taxNature.total).toEqual(1);
      });

      it('does not tax on a successful roll inside nature', () => {
        roll.dice.info.inNature = true;

        postRoll.outcome = 'success';
        postRoll.ob = 3;
        postRoll.totalSuccesses = 5;
        postRoll.margin = 2;

        const testImpact = impact(roll, mockCharacter, postRoll);

        expect(testImpact.taxNature).toBe(undefined);
      });
    });
  });
});