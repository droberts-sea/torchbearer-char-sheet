import abilities from './character/abilities_reducer';
import bio from './character/bio_reducer';
import conditions from './character/conditions_reducer';
import points from './character/points_reducer';
import skills from './character/skills_reducer';
import traits from './character/traits_reducer';
import wises from './character/wises_reducer';

import ui from './ui_reducer';

import roll from './roll/roll_reducer';

import {
  CURRENT_CHARACTER_VERSION,
  upgradeCharacter,
} from './character/upgrade';

const character = function(character={}, action) {
  if (character.version && character.version !== CURRENT_CHARACTER_VERSION) {
    character = upgradeCharacter(CURRENT_CHARACTER_VERSION, character);
  }

  return {
    version: CURRENT_CHARACTER_VERSION,
    abilities: abilities(character.abilities, action, character),
    bio: bio(character.bio, action),
    conditions: conditions(character.conditions, action),
    points: points(character.points, action),
    skills: skills(character.skills, action, character),
    traits: traits(character.traits, action, character),
    wises: wises(character.wises, action, character)
  };
};

export const tbCharApp = function(state={}, action) {
  console.log(action.type);
  state = {
    ui: ui(state.ui, action, state.character),
    character: character(state.character, action),
    roll: roll(state.roll, action, state.character)
  };

  return state;
};
