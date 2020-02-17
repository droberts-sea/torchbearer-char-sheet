import validateEdits from '../validate_edits';

import mockCharacter from '../../../mock/character';
import { deepCopy } from '../../../mock/util';

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
  });
});