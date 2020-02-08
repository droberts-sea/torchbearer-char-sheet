import addDiceDisabledOptions from '../add_dice_disabled_options';
import fakeCharacter from '../../../mock/character.js';
import { traitIsAvailable } from '../../../rules/traits';
import { deepCopy } from '../../../mock/util';

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

describe('addDiceDisabledOptions', () => {
  let resourcesSpent;
  beforeEach(() => {
    resourcesSpent = { fate: 0, persona: 0 };
  });
  describe('natureInstead', () => {
    test('it is not disabled for a BL skill', () => {
      const roll = deepCopy(fakeRoll);
      roll.dice.info.skill = 'ALCHEMIST';

      const disabled = addDiceDisabledOptions(roll, fakeCharacter, resourcesSpent);

      expect(disabled.natureInstead).toBe(false);
    });

    test ('it is disabled for open skills', () => {
      ['FIGHTER', 'ORATOR'].forEach((skill) => {
        const roll = deepCopy(fakeRoll);
        roll.dice.info.skill = skill;

        const disabled = addDiceDisabledOptions(roll, fakeCharacter, resourcesSpent);

        expect(disabled.natureInstead).toBe(true);
      })

    });

    test ('it is disabled for abilities', () => {
      const roll = deepCopy(fakeRoll);
      roll.dice.info.skill = 'WILL';

      const disabled = addDiceDisabledOptions(roll, fakeCharacter, resourcesSpent);

      expect(disabled.natureInstead).toBe(true);
    });

    test('it is disabled if a skill has not been selected', () => {
      const roll = deepCopy(fakeRoll);
      roll.dice.info.skill = undefined;

      const disabled = addDiceDisabledOptions(roll, fakeCharacter, resourcesSpent);

      expect(disabled.natureInstead).toBe(true);
    });
  });

  describe("unselectNatureInstead", () => {
    let roll, character;
    beforeEach(() => {
      roll = deepCopy(fakeRoll);
      character = deepCopy(fakeCharacter);
    });
    test("can unselect with open skill", () => {
      const skillName = 'Orator';
      expect(character.skills.ORATOR.open).toBeTruthy();

      roll.dice.info.skill = skillName;
      const disabled = addDiceDisabledOptions(roll, character, resourcesSpent);
      expect(disabled.unselectNatureInstead).toBeFalsy();
    });

    test("can unselect if not Afraid", () => {
      const skillName = 'Alchemist';
      expect(character.skills.ALCHEMIST.open).toBeFalsy();

      roll.dice.info.skill = skillName;
      character.conditions.AFRAID = false;
      const disabled = addDiceDisabledOptions(roll, character, resourcesSpent);
      expect(disabled.unselectNatureInstead).toBeFalsy();
    });

    test("cannot unselect if untrained and afraid", () => {
      const skillName = 'Alchemist';
      expect(character.skills.ALCHEMIST.open).toBeFalsy();

      roll.dice.info.skill = skillName;
      character.conditions.AFRAID = true;
      const disabled = addDiceDisabledOptions(roll, character, resourcesSpent);
      expect(disabled.unselectNatureInstead).toBeFalsy();
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

      disabled = addDiceDisabledOptions(roll, character, resourcesSpent);
      expect(disabled.traitBenefit).toBeFalsy();

      trait.uses = trait.level;
      expect(traitIsAvailable(trait)).toBeFalsy();

      disabled = addDiceDisabledOptions(roll, character, resourcesSpent);
      expect(disabled.traitBenefit).toBeTruthy();
    });

    test("Angry condition disables beneficial trait", () => {
      let disabled;
      trait.uses = 0;

      disabled = addDiceDisabledOptions(roll, character, resourcesSpent);
      expect(disabled.traitBenefit).toBeFalsy();

      character.conditions.ANGRY = true;

      disabled = addDiceDisabledOptions(roll, character, resourcesSpent);
      expect(disabled.traitBenefit).toBeTruthy();
    });

    test("Helping opponent with a trait is only available in a vs test", () => {
      let disabled;
      roll.dice.info.isVersus = false;

      disabled = addDiceDisabledOptions(roll, character, resourcesSpent);
      expect(disabled.traitOpponent).toBeTruthy();

      roll.dice.info.isVersus = true;

      disabled = addDiceDisabledOptions(roll, character, resourcesSpent);
      expect(disabled.traitOpponent).toBeFalsy();
    });
  });

  describe('persona dice', () => {
    let character;
    let roll;
    beforeEach(() => {
      character = deepCopy(fakeCharacter);
      roll = deepCopy(fakeRoll);
    });

    it('personaDice is limited by available persona', () => {
      character.points.persona.available = 2;
      resourcesSpent.persona = 0;
      
      let disabled = addDiceDisabledOptions(roll, character, resourcesSpent);
      expect(disabled.maxPersonaDice).toEqual(2);

      resourcesSpent.persona = 1;
      disabled = addDiceDisabledOptions(roll, character, resourcesSpent);
      expect(disabled.maxPersonaDice).toEqual(1);
    });

    it('personaDice max is never more than 3', () => {
      character.points.persona.available = 10;
      resourcesSpent.persona = 0;
      
      const disabled = addDiceDisabledOptions(roll, character, resourcesSpent);
      expect(disabled.maxPersonaDice).toEqual(3);
    });

    it('persona spent on personaDice is ignored in the cap', () => {
      character.points.persona.available = 2;
      roll.dice.modifiers.personaDice = 1;
      resourcesSpent.persona = 1;
      
      const disabled = addDiceDisabledOptions(roll, character, resourcesSpent);
      expect(disabled.maxPersonaDice).toEqual(2);
    });
  });

  describe('tap nature', () => {
    let character;
    let roll;
    beforeEach(() => {
      character = deepCopy(fakeCharacter);
      roll = deepCopy(fakeRoll);
    });

    it('is enabled if there is persona available', () => {
      character.points.persona.available = 2;
      resourcesSpent.persona = 1;

      const disabled = addDiceDisabledOptions(roll, character, resourcesSpent);
      expect(disabled.tapNature).toBeFalsy();
    });

    it('is disabled if there is not persona available', () => {
      character.points.persona.available = 1;
      resourcesSpent.persona = 1;

      const disabled = addDiceDisabledOptions(roll, character, resourcesSpent);
      expect(disabled.tapNature).toBeTruthy();
    });

    it('is enabled if the tapPersona modifier is set', () => {
      character.points.persona.available = 1;
      resourcesSpent.persona = 1;
      roll.dice.modifiers.tapNature = true;

      const disabled = addDiceDisabledOptions(roll, character, resourcesSpent);
      expect(disabled.tapNature).toBeFalsy();
    })
  });
});
