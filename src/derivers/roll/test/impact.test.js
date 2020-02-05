import impact from '../impact';

import mockRoll from '../../../mock/roll';
import mockCharacter from '../../../mock/character';

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

describe('resources', () => {
  let roll;
  beforeEach(() => {
    roll = deepCopy(mockRoll);
  })
  it('runs without crashing', () => {
    impact(mockRoll, mockCharacter);
  });

  describe('points', () => {
    it('tracks persona spent for extra dice', () => {
      roll.dice.modifiers.personaDice = 0;
      const before_impact = impact(roll, mockCharacter);

      roll.dice.modifiers.personaDice = 2;
      const after_impact = impact(roll, mockCharacter);

      expect(after_impact.points.total.persona).toEqual(before_impact.points.total.persona + 2);
    });

    it('Adds a persona for tapping nature', () => {
      roll.dice.modifiers.tapNature = false;
      const before_impact = impact(roll, mockCharacter);

      roll.dice.modifiers.tapNature = true;
      const after_impact = impact(roll, mockCharacter);

      expect(after_impact.points.total.persona).toEqual(before_impact.points.total.persona + 1);
    });

    it('Adds a fate for deeper understanding', () => {
      roll.results.reactions.deeperUnderstandingUsed = false;
      const before_impact = impact(roll, mockCharacter);

      roll.results.reactions.deeperUnderstandingUsed = true;
      const after_impact = impact(roll, mockCharacter);

      expect(after_impact.points.total.fate).toEqual(before_impact.points.total.fate + 1);
    });

    it('Adds a persona for of course', () => {
      roll.results.reactions.ofCourseUsed = false;
      const before_impact = impact(roll, mockCharacter);

      roll.results.reactions.ofCourseUsed = true;
      const after_impact = impact(roll, mockCharacter);

      expect(after_impact.points.total.persona).toEqual(before_impact.points.total.persona + 1);
    });

    it('Adds a fate for "fate for luck"', () => {
      roll.results.reactions.explodeSixes = false;
      const before_impact = impact(roll, mockCharacter);

      roll.results.reactions.explodeSixes = true;
      const after_impact = impact(roll, mockCharacter);

      expect(after_impact.points.total.fate).toEqual(before_impact.points.total.fate + 1);
    });

    it('adds one check for penalty trait use', () => {
      roll.dice.modifiers.traitName = undefined;
      roll.dice.modifiers.traitEffect = undefined;
      const before_impact = impact(roll, mockCharacter);

      roll.dice.modifiers.traitName = "Firey";
      roll.dice.modifiers.traitEffect = "penalty";
      const after_impact = impact(roll, mockCharacter);

      expect(after_impact.points.total.checks).toEqual(before_impact.points.total.checks + 1);
    });

    it('adds two checks for aid opponent trait use', () => {
      roll.dice.info.isVersus = true;
      roll.dice.modifiers.traitName = undefined;
      roll.dice.modifiers.traitEffect = undefined;
      const before_impact = impact(roll, mockCharacter);

      roll.dice.modifiers.traitName = "Firey";
      roll.dice.modifiers.traitEffect = "opponent";
      const after_impact = impact(roll, mockCharacter);

      expect(after_impact.points.total.checks).toEqual(before_impact.points.total.checks + 2);
    });
  });

  describe('beneficial trait', () => {
    it('records use of a beneficial trait', () => {
      roll.dice.modifiers.traitName = undefined;
      roll.dice.modifiers.traitEffect = undefined;
      const before_impact = impact(roll, mockCharacter);
      expect(before_impact.beneficialTrait).toBe(undefined);

      roll.dice.modifiers.traitName = "Firey";
      roll.dice.modifiers.traitEffect = "benefit";
      const after_impact = impact(roll, mockCharacter);
      expect(after_impact.beneficialTrait).toBe(roll.dice.modifiers.traitName);
    });

    it('ignores level 3 traits', () => {
      const traitName = 'Curious';
      expect(mockCharacter.traits.find(t => t.name === traitName).level).toEqual(3);

      roll.dice.modifiers.traitName = traitName;
      roll.dice.modifiers.traitEffect = 'benefit';
      const after_impact = impact(roll, mockCharacter);
      expect(after_impact.beneficialTrait).toBe(undefined);
    })
  });

  describe('wises', () => {
    it('marks use of deeper understanding', () => {
      const wiseName = mockCharacter.wises[0].name;

      roll.results.reactions.deeperUnderstandingUsed = false;
      roll.results.reactions.deeperUnderstandingWise = undefined;
      const before_impact = impact(roll, mockCharacter);
      expect(before_impact.wises.length).toEqual(0);

      roll.results.reactions.deeperUnderstandingUsed = true;
      roll.results.reactions.deeperUnderstandingWise = wiseName;
      const after_impact = impact(roll, mockCharacter);
      expect(after_impact.wises.length).toEqual(1);
      expect(after_impact.wises[0].name).toEqual(wiseName);
      expect(after_impact.wises[0].mark).toEqual('fate');
    });

    it('marks use of of course', () => {
      const wiseName = mockCharacter.wises[0].name;

      roll.results.reactions.ofCourseUsed = false;
      roll.results.reactions.ofCourseWise = undefined;
      const before_impact = impact(roll, mockCharacter);
      expect(before_impact.wises.length).toEqual(0);

      roll.results.reactions.ofCourseUsed = true;
      roll.results.reactions.ofCourseWise = wiseName;
      const after_impact = impact(roll, mockCharacter);
      expect(after_impact.wises.length).toEqual(1);
      expect(after_impact.wises[0].name).toEqual(wiseName);
      expect(after_impact.wises[0].mark).toEqual('persona');
    });

    it('detects when a wise has already been used for deeper understanding', () => {
      const character = deepCopy(mockCharacter);
      const wise = character.wises[0];

      roll.results.reactions.deeperUnderstandingUsed = true;
      roll.results.reactions.deeperUnderstandingWise = wise.name;
      wise.advancement.fate = false;

      const before_impact = impact(roll, character);
      expect(before_impact.wises[0].alreadyMarked).toBeFalsy();

      wise.advancement.fate = true;
      const after_impact = impact(roll, character);
      expect(after_impact.wises[0].alreadyMarked).toBeTruthy();
    });

    it('detects when a wise has already been used for of course', () => {
      const character = deepCopy(mockCharacter);
      const wise = character.wises[0];

      roll.results.reactions.ofCourseUsed = true;
      roll.results.reactions.ofCourseWise = wise.name;
      wise.advancement.persona = false;

      const before_impact = impact(roll, character);
      expect(before_impact.wises[0].alreadyMarked).toBeFalsy();

      wise.advancement.persona = true;
      const after_impact = impact(roll, character);
      expect(after_impact.wises[0].alreadyMarked).toBeTruthy();
    });

    it('detects when a wise is ready for advancement through DU', () => {
      const character = deepCopy(mockCharacter);
      const wise = character.wises[0];

      roll.results.reactions.deeperUnderstandingUsed = true;
      roll.results.reactions.deeperUnderstandingWise = wise.name;
      wise.advancement.pass = true;
      wise.advancement.fail = true;
      wise.advancement.persona = false;
      wise.advancement.fate = false;

      const before_impact = impact(roll, character);
      expect(before_impact.wises[0].advance).toBeFalsy();

      wise.advancement.persona = true;
      const after_impact = impact(roll, character);
      expect(after_impact.wises[0].advance).toBeTruthy();
    });

    it('detects when a wise is ready for advancement through OfC', () => {
      const character = deepCopy(mockCharacter);
      const wise = character.wises[0];

      roll.results.reactions.ofCourseUsed = true;
      roll.results.reactions.ofCourseWise = wise.name;
      wise.advancement.pass = true;
      wise.advancement.fail = true;
      wise.advancement.persona = false;
      wise.advancement.fate = false;

      const before_impact = impact(roll, character);
      expect(before_impact.wises[0].advance).toBeFalsy();

      wise.advancement.fate = true;
      const after_impact = impact(roll, character);
      expect(after_impact.wises[0].advance).toBeTruthy();
    });
  });

  describe('skills', () => {

  });

  describe('tax', () => {

  });
});