import disabledOptions from '../disabled_options';
import fakeCharacter from '../../../mock/character.js';
import { traitIsAvailable } from '../../../rules/traits';

const fakeRoll = {
  dice: {
    info: {
      isVersus: false,
      skill: undefined,
      ob: 3,
      inNature: false,
      isInstinct: false,
      isRecovery: false,
      isDisposition: true
    },
    modifiers: {
      natureInstead: false,
      tapNature: false,
      traitName: undefined,
      traitChecks: 0,
      help: 0,
      personaDice: 0
    }
  }
};

const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}

describe('disabledOptions', () => {
  describe('natureInstead', () => {
    test('it is not disabled for a BL skill', () => {
      const roll = deepCopy(fakeRoll);
      roll.dice.info.skill = 'ALCHEMIST';

      const disabled = disabledOptions(roll, fakeCharacter);

      expect(disabled.natureInstead).toBe(false);
    });

    test ('it is disabled for open skills', () => {
      ['FIGHTER', 'ORATOR'].forEach((skill) => {
        const roll = deepCopy(fakeRoll);
        roll.dice.info.skill = skill;

        const disabled = disabledOptions(roll, fakeCharacter);

        expect(disabled.natureInstead).toBe(true);
      })

    });

    test ('it is disabled for abilities', () => {
      const roll = deepCopy(fakeRoll);
      roll.dice.info.skill = 'WILL';

      const disabled = disabledOptions(roll, fakeCharacter);

      expect(disabled.natureInstead).toBe(true);
    });

    test('it is disabled if a skill has not been selected', () => {
      const roll = deepCopy(fakeRoll);
      roll.dice.info.skill = undefined;

      const disabled = disabledOptions(roll, fakeCharacter);

      expect(disabled.natureInstead).toBe(true);
    });
  });

  describe("traits", () => {
    let roll, character, trait;
    beforeEach(() => {
      const traitName = "Firey";

      roll = deepCopy(fakeRoll);
      roll.dice.modifiers.traitName = traitName;

      character = deepCopy(fakeCharacter);
      trait = character.traits.find(trait => trait.name === traitName);
    });

    test("beneficial trait not available if trait uses expended", () => {
      let disabled;
      
      trait.uses = 0;
      expect(traitIsAvailable(trait)).toBeTruthy();

      disabled = disabledOptions(roll, character);
      expect(disabled.traitBenefit).toBeFalsy();

      trait.uses = trait.level;
      expect(traitIsAvailable(trait)).toBeFalsy();

      disabled = disabledOptions(roll, character);
      expect(disabled.traitBenefit).toBeTruthy();
    });

    test("Angry condition disables beneficial trait", () => {
      let disabled;
      trait.uses = 0;

      disabled = disabledOptions(roll, character);
      expect(disabled.traitBenefit).toBeFalsy();

      character.conditions.ANGRY = true;

      disabled = disabledOptions(roll, character);
      expect(disabled.traitBenefit).toBeTruthy();
    });

    test("Helping opponent with a trait is only available in a vs test", () => {
      let disabled;
      roll.dice.info.isVersus = false;

      disabled = disabledOptions(roll, character);
      expect(disabled.traitOpponent).toBeTruthy();

      roll.dice.info.isVersus = true;

      disabled = disabledOptions(roll, character);
      expect(disabled.traitOpponent).toBeFalsy();
    });
  });
});
