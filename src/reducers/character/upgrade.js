export const CURRENT_CHARACTER_VERSION = 3;

export const upgradeCharacter = (toVersion, character) => {
  if (toVersion > CURRENT_CHARACTER_VERSION) {
    throw new Error(`Unknown character version ${toVersion}`);
  }

  if (character.version < 2 && toVersion >= 2) {
    if (!character.bio) {
      // Give them a blank bio
      character = {
        ...character,
        bio: {},
        version: 2,
      };
    }
  }

  if (character.version < 3 && toVersion >= 3) {
    // Mark any skill with a non-zero rating as open
    character = { ...character, version: 3 };
    character.skills = { ...character.skills };

    Object.keys(character.skills).forEach((skillName) => {
      const skill = character.skills[skillName];
      if (!skill.open && skill.rating > 0) {
        character.skills[skillName] = {
          ...skill,
          open: true
        }
      }
    });
  }
  
  return character;
};