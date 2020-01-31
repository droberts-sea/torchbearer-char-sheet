import roll_resources from '../roll_resources';

import mockRoll from '../../../mock/roll';

describe('resources', () => {
  let roll;
  beforeEach(() => {
    roll = JSON.parse(JSON.stringify(mockRoll));
  })
  it('runs without crashing', () => {
    roll_resources(mockRoll);
  });

  it('tracks persona spent for extra dice', () => {
    roll.dice.modifiers.personaDice = 0;
    const before_resources = roll_resources(roll);
    
    roll.dice.modifiers.personaDice = 2;
    const after_resources = roll_resources(roll);

    expect(after_resources.persona).toEqual(before_resources.persona + 2);
  });

  it('Adds a persona for tapping nature', () => {
    roll.dice.modifiers.tapNature = false;
    const before_resources = roll_resources(roll);
    
    roll.dice.modifiers.tapNature = true;
    const after_resources = roll_resources(roll);

    expect(after_resources.persona).toEqual(before_resources.persona + 1);
  });

  it('Adds a fate for deeper understanding', () => {
    roll.results.reactions.deeperUnderstandingUsed = false;
    const before_resources = roll_resources(roll);
    
    roll.results.reactions.deeperUnderstandingUsed = true;
    const after_resources = roll_resources(roll);

    expect(after_resources.fate).toEqual(before_resources.fate + 1);
  });

  it('Adds a persona for of course', () => {
    roll.results.reactions.ofCourse = false;
    const before_resources = roll_resources(roll);
    
    roll.results.reactions.ofCourse = true;
    const after_resources = roll_resources(roll);

    expect(after_resources.persona).toEqual(before_resources.persona + 1);
  });

  it('Adds a fate for "fate for luck"', () => {
    roll.results.reactions.explodeSixes = false;
    const before_resources = roll_resources(roll);
    
    roll.results.reactions.explodeSixes = true;
    const after_resources = roll_resources(roll);

    expect(after_resources.fate).toEqual(before_resources.fate + 1);
  });
});