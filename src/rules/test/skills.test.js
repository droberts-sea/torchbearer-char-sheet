import { skillReadyToAdvance } from '../skills';

import mockCharacter from '../../mock/character';
import { deepCopy } from '../../mock/util';

const mockSkill = mockCharacter.skills[Object.keys(mockCharacter.skills)[0]];
const mockUntaxedNature = mockCharacter.abilities.NATURE.untaxed;

describe('skillReadyToAdvance', () => {
  let skill;
  beforeEach(() => {
    skill = deepCopy(mockSkill);
  });

  it('runs without crashing', () => {
    skillReadyToAdvance(mockSkill, mockUntaxedNature);
  });

  describe('open skills', () => {
    it('requires passes equal to the skill\'s rating', () => {
      skill.open = true;
      skill.rating = 3;
      skill.advancement.pass = 2;
      skill.advancement.fail = 5;

      expect(skillReadyToAdvance(skill, mockUntaxedNature)).toBeFalsy();

      skill.advancement.pass = 3;
      expect(skillReadyToAdvance(skill, mockUntaxedNature)).toBeTruthy();
    });

    it("requires failures equal to one less than the skill's rating", () => {
      skill.open = true;
      skill.rating = 3;
      skill.advancement.pass = 3;
      skill.advancement.fail = 1;

      expect(skillReadyToAdvance(skill, mockUntaxedNature)).toBeFalsy();

      skill.advancement.fail = 2;
      expect(skillReadyToAdvance(skill, mockUntaxedNature)).toBeTruthy();
    });

    it('can add a pass', () => {
      skill.open = true;
      skill.rating = 3;
      skill.advancement.pass = 2;
      skill.advancement.fail = 5;

      expect(skillReadyToAdvance(skill, mockUntaxedNature)).toBeFalsy();
      expect(skillReadyToAdvance(skill, mockUntaxedNature, 'pass')).toBeTruthy();
    });

    it('can add a fail', () => {
      skill.open = true;
      skill.rating = 3;
      skill.advancement.pass = 5;
      skill.advancement.fail = 1;

      expect(skillReadyToAdvance(skill, mockUntaxedNature)).toBeFalsy();
      expect(skillReadyToAdvance(skill, mockUntaxedNature, 'fail')).toBeTruthy();
    });

    it("won't advance a skill beyond it's max", () => {
      skill.open = true;
      skill.rating = 3;
      skill.advancement.pass = 3;
      skill.advancement.fail = 2;

      expect(skillReadyToAdvance(skill, mockUntaxedNature)).toBeTruthy();

      skill.max = 3;
      expect(skillReadyToAdvance(skill, mockUntaxedNature)).toBeFalsy();
    });

    it("requires at least one test for a skill with rating 0", () => {
      skill.open = true;
      skill.rating = 0;
      skill.advancement.pass = 0;
      skill.advancement.fail = 0;

      expect(skillReadyToAdvance(skill, mockUntaxedNature)).toBeFalsy();

      skill.advancement.pass = 1;
      expect(skillReadyToAdvance(skill, mockUntaxedNature)).toBeTruthy();
    });
  });

  describe('New skills', () => {
    it('requires attempts equal to the untaxed nature rating', () => {
      skill.open = false;
      skill.advancement.pass = mockUntaxedNature - 1;
      skill.advancement.fail = 0;

      expect(skillReadyToAdvance(skill, mockUntaxedNature)).toBeFalsy();

      skill.advancement.pass += 1;
      expect(skillReadyToAdvance(skill, mockUntaxedNature)).toBeTruthy();
    });

    it('accepts either pass or fail', () => {
      const untaxedNature = 5;
      skill.open = false;
      skill.advancement.pass = 3;
      skill.advancement.fail = 2;

      expect(skillReadyToAdvance(skill, untaxedNature)).toBeTruthy();
    });

    it('can add a pass or fail', () => {
      skill.open = false;
      skill.advancement.pass = mockUntaxedNature - 1;
      skill.advancement.fail = 0;

      expect(skillReadyToAdvance(skill, mockUntaxedNature)).toBeFalsy();
      expect(skillReadyToAdvance(skill, mockUntaxedNature, 'pass')).toBeTruthy();
      expect(skillReadyToAdvance(skill, mockUntaxedNature, 'fail')).toBeTruthy();
    });
  });

  it('Uses untaxed nature for the required number of tests for the NATURE ability', () => {
    const nature = deepCopy(mockCharacter.abilities.NATURE);
    nature.rating = 3;
    nature.untaxed = 5;

    nature.advancement.pass = 3;
    nature.advancement.fail = 2;
    expect(skillReadyToAdvance(nature, nature.untaxed)).toBeFalsy();

    nature.advancement.pass = 5;
    nature.advancement.fail = 4;
    expect(skillReadyToAdvance(nature, nature.untaxed)).toBeTruthy();
  });

  it('Returns false for MIGHT', () => {
    const might = deepCopy(mockCharacter.abilities.MIGHT);
    expect(skillReadyToAdvance(might, mockUntaxedNature)).toBeFalsy();
  })
});