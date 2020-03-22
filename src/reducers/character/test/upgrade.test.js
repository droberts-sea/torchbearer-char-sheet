import { upgradeCharacter } from '../upgrade';
import mockCharacter from '../../../mock/character';
import { deepCopy } from '../../../mock/util';

const skillName = Object.keys(mockCharacter.skills)[0];

describe(upgradeCharacter, () => {
  let character;
  beforeEach(() => {
    character = deepCopy(mockCharacter);
  });

  describe('2 -> 3', () => {
    it('runs between v2 and v3', () => {
      character.skills[skillName].rating = 2;
      character.skills[skillName].open = false;
      let upgraded;

      character.version = 1;
      upgraded = upgradeCharacter(2, character);
      expect(upgraded.skills[skillName].open).toBeFalsy();

      // upgraded = upgradeCharacter(3, 4, character);
      // expect(upgraded.skills[skillName].open).toBeFalsy();

      character.version = 2;
      upgraded = upgradeCharacter(3, character);
      expect(upgraded.skills[skillName].open).toBeTruthy();
      expect(upgraded.version).toBeGreaterThanOrEqual(3);
    });

    it('ignores skills ranked 0', () => {
      character.skills[skillName].rating = 0;
      character.skills[skillName].open = false;
      character.version = 2;
      const upgraded = upgradeCharacter(3, character);
      expect(upgraded.skills[skillName].open).toBeFalsy();
    });
  });
});