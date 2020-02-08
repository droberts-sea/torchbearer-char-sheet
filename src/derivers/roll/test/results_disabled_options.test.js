import resultsDisabledOptions from '../results_disabled_options';

import mockCharacter from '../../../mock/character';
import mockRoll from '../../../mock/roll';
import { deepCopy } from '../../../mock/util';

describe('resultsDisabledOptions', () => {
  let roll;
  let character;
  let resourcesSpent;
  beforeEach(() => {
    roll = deepCopy(mockRoll);
    character = deepCopy(mockCharacter);
    resourcesSpent = { fate: 0, persona: 0 };
  });

  it('runs without crashing', () => {
    resultsDisabledOptions(mockRoll, mockCharacter, resourcesSpent);
  });

  describe('explodeSixes', () => {
    it('is enabled if unused and character has at least one fate point', () => {
      character.points.fate.available = 1;
      roll.results.reactions.explodeSixes = false;

      const disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

      expect(disabledOptions.explodeSixes).toBeFalsy();
    });

    it('is disabled if already used', () => {
      character.points.fate.available = 1;
      roll.results.reactions.explodeSixes = true;

      const disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

      expect(disabledOptions.explodeSixes).toBeTruthy();
    });

    it('is disabled if character has no fate points', () => {
      character.points.fate.available = 0;
      roll.results.reactions.explodeSixes = false;

      let disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

      expect(disabledOptions.explodeSixes).toBeTruthy();

      character.points.fate.available = 1;
      resourcesSpent.fate = 1;
      disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);
      expect(disabledOptions.explodeSixes).toBeTruthy();
    });
  });

  describe('Deeper Understanding', () => {
    describe('Button', () => {
      beforeEach(() => {
        character.points.fate.available = 1;
        roll.results.reactions.deeperUnderstandingUsed = false;
        roll.results.reactions.deeperUnderstandingWise = character.wises[0].name;
      });

      it('is enabled if unused, fate available and wise selected', () => {
        const disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.deeperUnderstanding.button).toBeFalsy();
      });

      it('is disabled if already used', () => {
        roll.results.reactions.deeperUnderstandingUsed = true;

        const disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.deeperUnderstanding.button).toBeTruthy();
      });

      it('is disabled if character has no fate points', () => {
        character.points.fate.available = 0;

        let disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.deeperUnderstanding.button).toBeTruthy();

        character.points.fate.available = 1;
        resourcesSpent.fate = 1;
        disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);
        expect(disabledOptions.deeperUnderstanding.button).toBeTruthy();
      });

      it('is disabled if no wise is selected', () => {
        roll.results.reactions.deeperUnderstandingWise = undefined;

        const disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.deeperUnderstanding.button).toBeTruthy();
      });
    });

    describe('Select', () => {
      beforeEach(() => {
        character.points.fate.available = 1;
        roll.results.reactions.deeperUnderstandingUsed = false;
        roll.results.reactions.deeperUnderstandingWise = character.wises[0].name;
      });

      it('is enabled if unused, fate available and wise selected', () => {
        const disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.deeperUnderstanding.select).toBeFalsy();
      });

      it('is disabled if already used', () => {
        roll.results.reactions.deeperUnderstandingUsed = true;

        const disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.deeperUnderstanding.select).toBeTruthy();
      });

      it('is disabled if character has no fate points', () => {
        character.points.fate.available = 0;

        let disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.deeperUnderstanding.select).toBeTruthy();

        character.points.fate.available = 1;
        resourcesSpent.fate = 1;
        disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);
        expect(disabledOptions.deeperUnderstanding.select).toBeTruthy();
      });

      it('is enabled if no wise is selected', () => {
        roll.results.reactions.deeperUnderstandingWise = undefined;

        const disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.deeperUnderstanding.select).toBeFalsy();
      });
    });

    describe('Wises', () => {
      it('is an empty list by default', () => {
        roll.results.reactions.ofCourseWise = undefined;

        const disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.deeperUnderstanding.wises).toEqual([]);
      });

      it('contains the value of the selected Of Course wise', () => {
        const wise = character.wises[0].name;
        roll.results.reactions.ofCourseWise = wise;

        const disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.deeperUnderstanding.wises).toContain(wise);
      });
    });
  });

  describe('Of Course', () => {
    describe('Button', () => {
      beforeEach(() => {
        character.points.persona.available = 1;
        roll.results.reactions.ofCourseUsed = false;
        roll.results.reactions.ofCourseWise = character.wises[0].name;
      });

      it('is enabled if unused, persona available and wise selected', () => {
        const disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.ofCourse.button).toBeFalsy();
      });

      it('is disabled if already used', () => {
        roll.results.reactions.ofCourseUsed = true;

        const disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.ofCourse.button).toBeTruthy();
      });

      it('is disabled if character has no persona points', () => {
        character.points.persona.available = 0;

        let disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.ofCourse.button).toBeTruthy();

        character.points.persona.available = 1;
        resourcesSpent.persona = 1;
        disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);
        expect(disabledOptions.ofCourse.button).toBeTruthy();
      });

      it('is disabled if no wise is selected', () => {
        roll.results.reactions.ofCourseWise = undefined;

        const disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.ofCourse.button).toBeTruthy();
      });
    });

    describe('Select', () => {
      beforeEach(() => {
        character.points.persona.available = 1;
        roll.results.reactions.ofCourseUsed = false;
        roll.results.reactions.ofCourseWise = character.wises[0].name;
      });

      it('is enabled if unused, persona available and wise selected', () => {
        const disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.ofCourse.select).toBeFalsy();
      });

      it('is disabled if already used', () => {
        roll.results.reactions.ofCourseUsed = true;

        const disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.ofCourse.select).toBeTruthy();
      });

      it('is disabled if character has no persona points', () => {
        character.points.persona.available = 0;

        let disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.ofCourse.select).toBeTruthy();

        character.points.persona.available = 1;
        resourcesSpent.persona = 1;
        disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);
        expect(disabledOptions.ofCourse.select).toBeTruthy();
      });

      it('is enabled if no wise is selected', () => {
        roll.results.reactions.ofCourseWise = undefined;

        const disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.ofCourse.select).toBeFalsy();
      });
    });

    describe('Wises', () => {
      it('is an empty list by default', () => {
        roll.results.reactions.deeperUnderstandingWise = undefined;

        const disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.ofCourse.wises).toEqual([]);
      });

      it('contains the value of the selected Of Course wise', () => {
        const wise = character.wises[0].name;
        roll.results.reactions.deeperUnderstandingWise = wise;

        const disabledOptions = resultsDisabledOptions(roll, character, resourcesSpent);

        expect(disabledOptions.ofCourse.wises).toContain(wise);
      });
    });
  });
});