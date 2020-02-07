import { skillReadyToAdvance } from '../skills';

import mockCharacter from '../../mock/character';

const mockSkill = mockCharacter.skills[Object.keys(mockCharacter.skills)[0]];
const mockUntaxedNature = mockCharacter.abilities.NATURE.untaxed;

const deepCopy = obj => JSON.parse(JSON.stringify(obj));

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
});