import disabledOptions from '../disabled_options';

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

const fakeCharacter = {
  skills: {
    ALCHEMIST: {
      rating: 0,
      open: false
    },
    FIGHTER: {
      rating: 0,
      open: true
    },
    ORATOR: {
      rating: 3,
      open: true
    }
  },
  abilities: {
    WILL: {
      rating: 3
    }
  }
};

describe('disabledOptions', () => {
  describe('natureInstead', () => {
    test('it is not disabled for a BL skill', () => {
      const roll = JSON.parse(JSON.stringify(fakeRoll));
      roll.dice.info.skill = 'ALCHEMIST';

      const disabled = disabledOptions(roll, fakeCharacter);

      expect(disabled.natureInstead).toBe(false);
    });

    test ('it is disabled for open skills', () => {
      ['FIGHTER', 'ORATOR'].forEach((skill) => {
        const roll = JSON.parse(JSON.stringify(fakeRoll));
        roll.dice.info.skill = skill;

        const disabled = disabledOptions(roll, fakeCharacter);

        expect(disabled.natureInstead).toBe(true);
      })

    });

    test ('it is disabled for abilities', () => {
      const roll = JSON.parse(JSON.stringify(fakeRoll));
      roll.dice.info.skill = 'WILL';

      const disabled = disabledOptions(roll, fakeCharacter);

      expect(disabled.natureInstead).toBe(true);
    });

    test('it is disabled if a skill has not been selected', () => {
      const roll = JSON.parse(JSON.stringify(fakeRoll));
      roll.dice.info.skill = undefined;

      const disabled = disabledOptions(roll, fakeCharacter);

      expect(disabled.natureInstead).toBe(true);
    });
  })
});
