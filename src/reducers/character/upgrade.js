export const CURRENT_CHARACTER_VERSION = 2;

export const upgradeCharacter = (fromVersion, toVersion, character) => {
  if (fromVersion === 1 && toVersion === 2) {
    if (!character.bio) {
      // Give them a blank bio
      character = { ...character };
      character.bio = {};
    }
    return character;
  }

  throw new Error(`No upgrade path found for character data from v${fromVersion} to v${toVersion})`);
}