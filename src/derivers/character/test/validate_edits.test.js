import validateEdits from '../validate_edits';

import mockCharacter from '../../../mock/character';
import { deepCopy } from '../../../mock/util';
import { skillReadyToAdvance } from '../../../rules/skills';

describe(validateEdits, () => {
  let character;
  beforeEach(() => {
    character = deepCopy(mockCharacter);
  });

  it('identifies no problems for the mock character', () => {
    validateEdits(mockCharacter);
  });

  it('returns undefined if given no character', () => {
    const problems = validateEdits();
    expect(problems).toBe(undefined);
  })

  describe('wises', () => {
    it('marks empty wise names as invalid', () => {
      const wiseIndex = 1;
      character.wises[wiseIndex].name = '';

      const problems = validateEdits(character);
      expect(Object.keys(problems.wises)).toContain(wiseIndex.toString());
      expect(Object.keys(problems.wises[wiseIndex])).toContain('name');
    });

    it('marks duplicate wise names as invalid', () => {
      const wiseName = 'duplicate';
      character.wises[0].name = wiseName;
      character.wises[1].name = wiseName;

      const problems = validateEdits(character);
      expect(Object.keys(problems.wises)).toEqual(['0', '1']);
      expect(Object.keys(problems.wises[0])).toContain('name');
      expect(Object.keys(problems.wises[1])).toContain('name');
    });
  });

  describe('traits', () => {
    it('marks empty trait names as invalid', () => {
      const traitIndex = 1;
      character.traits[traitIndex].name = '';

      const problems = validateEdits(character);
      expect(Object.keys(problems.traits)).toContain(traitIndex.toString());
      expect(Object.keys(problems.traits[traitIndex])).toContain('name');
    });

    it('marks duplicate trait names as invalid', () => {
      const traitName = 'duplicate';
      character.traits[0].name = traitName;
      character.traits[1].name = traitName;

      const problems = validateEdits(character);
      expect(Object.keys(problems.traits)).toEqual(['0', '1']);
      expect(Object.keys(problems.traits[0])).toContain('name');
      expect(Object.keys(problems.traits[1])).toContain('name');
    });

    it('marks level under 1 invalid', () => {
      character.traits[0].level = 0;
      const problems = validateEdits(character);
      expect(Object.keys(problems.traits)).toEqual(['0']);
      expect(Object.keys(problems.traits[0])).toContain('level');
    });

    it('marks level over 3 invalid', () => {
      character.traits[0].level = 4;
      const problems = validateEdits(character);
      expect(Object.keys(problems.traits)).toEqual(['0']);
      expect(Object.keys(problems.traits[0])).toContain('level');
    });
  });

  describe('skills', () => {
    it('marks rating invalid over max', () => {
      const skillName = 'ALCHEMIST';
      character.skills[skillName].rating = character.skills[skillName].max;
      const beforeProblems = validateEdits(character);
      expect(beforeProblems.skills).toEqual({});

      character.skills[skillName].rating = character.skills[skillName].max + 1;
      const afterProblems = validateEdits(character);
      expect(Object.keys(afterProblems.skills)).toEqual([skillName]);
      expect(Object.keys(afterProblems.skills[skillName])).toContain('rating');
    });

    it('marks rating invalid under min', () => {
      const skillName = 'ALCHEMIST';
      character.skills[skillName].rating = character.skills[skillName].min;
      const beforeProblems = validateEdits(character);
      expect(beforeProblems.skills).toEqual({});

      character.skills[skillName].rating = character.skills[skillName].min - 1;
      const afterProblems = validateEdits(character);
      expect(Object.keys(afterProblems.skills)).toEqual([skillName]);
      expect(Object.keys(afterProblems.skills[skillName])).toContain('rating');
    });

    it('marks pass invalid under 0', () => {
      const skillName = 'ALCHEMIST';
      character.skills[skillName].advancement.pass = 0;
      const beforeProblems = validateEdits(character);
      expect(beforeProblems.skills).toEqual({});

      character.skills[skillName].advancement.pass = -1;
      const afterProblems = validateEdits(character);
      expect(Object.keys(afterProblems.skills)).toEqual([skillName]);
      expect(Object.keys(afterProblems.skills[skillName])).toContain('pass');
    });

    it('marks fail invalid under 0', () => {
      const skillName = 'ALCHEMIST';
      character.skills[skillName].advancement.fail = 0;
      const beforeProblems = validateEdits(character);
      expect(beforeProblems.skills).toEqual({});

      character.skills[skillName].advancement.fail = -1;
      const afterProblems = validateEdits(character);
      expect(Object.keys(afterProblems.skills)).toEqual([skillName]);
      expect(Object.keys(afterProblems.skills[skillName])).toContain('fail');
    });

    it('marks pass + fail invalid if they would cause advancement', () => {
      const skillName = 'ALCHEMIST';
      const skill = character.skills[skillName];
      skill.open = true;
      skill.rating = 3;
      skill.advancement.pass = 2;
      skill.advancement.fail = 2;
      expect(skillReadyToAdvance(skill)).toBeFalsy();

      const beforeProblems = validateEdits(character);
      expect(beforeProblems.skills).toEqual({});

      skill.advancement.pass = 3;
      expect(skillReadyToAdvance(skill)).toBeTruthy();

      const afterProblems = validateEdits(character);
      expect(Object.keys(afterProblems.skills)).toEqual([skillName]);
      expect(Object.keys(afterProblems.skills[skillName])).toContain('pass');
      expect(Object.keys(afterProblems.skills[skillName])).toContain('fail');
    });
  });

  describe('abilities', () => {
    it('marks rating invalid over max', () => {
      const abilityName = 'WILL';
      character.abilities[abilityName].rating = character.abilities[abilityName].max;
      const beforeProblems = validateEdits(character);
      expect(beforeProblems.abilities).toEqual({});

      character.abilities[abilityName].rating = character.abilities[abilityName].max + 1;
      const afterProblems = validateEdits(character);
      expect(Object.keys(afterProblems.abilities)).toEqual([abilityName]);
      expect(Object.keys(afterProblems.abilities[abilityName])).toContain('rating');
    });

    it('marks rating invalid under min', () => {
      const abilityName = 'WILL';
      character.abilities[abilityName].rating = character.abilities[abilityName].min;
      const beforeProblems = validateEdits(character);
      expect(beforeProblems.abilities).toEqual({});

      character.abilities[abilityName].rating = character.abilities[abilityName].min - 1;
      const afterProblems = validateEdits(character);
      expect(Object.keys(afterProblems.abilities)).toEqual([abilityName]);
      expect(Object.keys(afterProblems.abilities[abilityName])).toContain('rating');
    });

    it('marks pass invalid under 0', () => {
      const abilityName = 'WILL';
      character.abilities[abilityName].advancement.pass = 0;
      const beforeProblems = validateEdits(character);
      expect(beforeProblems.abilities).toEqual({});

      character.abilities[abilityName].advancement.pass = -1;
      const afterProblems = validateEdits(character);
      expect(Object.keys(afterProblems.abilities)).toEqual([abilityName]);
      expect(Object.keys(afterProblems.abilities[abilityName])).toContain('pass');
    });

    it('marks fail invalid under 0', () => {
      const abilityName = 'WILL';
      character.abilities[abilityName].advancement.fail = 0;
      const beforeProblems = validateEdits(character);
      expect(beforeProblems.abilities).toEqual({});

      character.abilities[abilityName].advancement.fail = -1;
      const afterProblems = validateEdits(character);
      expect(Object.keys(afterProblems.abilities)).toEqual([abilityName]);
      expect(Object.keys(afterProblems.abilities[abilityName])).toContain('fail');
    });

    it('marks pass + fail invalid if they would cause advancement', () => {
      const abilityName = 'WILL';
      const ability = character.abilities[abilityName];
      ability.open = true;
      ability.rating = 3;
      ability.advancement.pass = 2;
      ability.advancement.fail = 2;
      expect(skillReadyToAdvance(ability)).toBeFalsy();

      const beforeProblems = validateEdits(character);
      expect(beforeProblems.abilities).toEqual({});

      ability.advancement.pass = 3;
      expect(skillReadyToAdvance(ability)).toBeTruthy();

      const afterProblems = validateEdits(character);
      expect(Object.keys(afterProblems.abilities)).toEqual([abilityName]);
      expect(Object.keys(afterProblems.abilities[abilityName])).toContain('pass');
      expect(Object.keys(afterProblems.abilities[abilityName])).toContain('fail');
    });

    describe('NATURE', () => {
      it('marks rating invalid if greater than untaxed', () => {
        const abilityName = 'NATURE';
        character.abilities[abilityName].rating = character.abilities.NATURE.untaxed;
        const beforeProblems = validateEdits(character);
        expect(beforeProblems.abilities).toEqual({});

        character.abilities[abilityName].rating = character.abilities.NATURE.untaxed + 1;
        const afterProblems = validateEdits(character);
        expect(Object.keys(afterProblems.abilities)).toEqual([abilityName]);
        expect(Object.keys(afterProblems.abilities[abilityName])).toContain('rating');
      });

      it('marks rating invalid under 1', () => {
        const abilityName = 'NATURE';
        character.abilities[abilityName].rating = character.abilities[abilityName].min;
        const beforeProblems = validateEdits(character);
        expect(beforeProblems.abilities).toEqual({});
  
        character.abilities[abilityName].rating = character.abilities[abilityName].min - 1;
        const afterProblems = validateEdits(character);
        expect(Object.keys(afterProblems.abilities)).toEqual([abilityName]);
        expect(Object.keys(afterProblems.abilities[abilityName])).toContain('rating');
      });

      it('marks untaxed invalid if greater than 7', () => {
        const abilityName = 'NATURE';
        character.abilities[abilityName].untaxed = 7;
        const beforeProblems = validateEdits(character);
        expect(beforeProblems.abilities).toEqual({});

        character.abilities[abilityName].untaxed = 8;
        const afterProblems = validateEdits(character);
        expect(Object.keys(afterProblems.abilities)).toEqual([abilityName]);
        expect(Object.keys(afterProblems.abilities[abilityName])).toContain('untaxed');
      });

      it('marks untaxed invalid under 0', () => {
        const abilityName = 'NATURE';
        character.abilities[abilityName].untaxed = 0;
        const beforeProblems = validateEdits(character);
        expect(beforeProblems.abilities[abilityName]).not.toContain('untaxed');
  
        character.abilities[abilityName].untaxed = -1;
        const afterProblems = validateEdits(character);
        expect(Object.keys(afterProblems.abilities)).toEqual([abilityName]);
        expect(Object.keys(afterProblems.abilities[abilityName])).toContain('untaxed');
      });
    });
  });
});