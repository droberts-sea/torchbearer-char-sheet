import impact from '../impact';

import mockRoll from '../../../mock/roll';

describe('resources', () => {
  let roll;
  beforeEach(() => {
    roll = JSON.parse(JSON.stringify(mockRoll));
  })
  it('runs without crashing', () => {
    impact(mockRoll);
  });

  it('tracks persona spent for extra dice', () => {
    roll.dice.modifiers.personaDice = 0;
    const before_impact = impact(roll);
    
    roll.dice.modifiers.personaDice = 2;
    const after_impact = impact(roll);

    expect(after_impact.points.total.persona).toEqual(before_impact.points.total.persona + 2);
  });

  it('Adds a persona for tapping nature', () => {
    roll.dice.modifiers.tapNature = false;
    const before_impact = impact(roll);
    
    roll.dice.modifiers.tapNature = true;
    const after_impact = impact(roll);

    expect(after_impact.points.total.persona).toEqual(before_impact.points.total.persona + 1);
  });

  it('Adds a fate for deeper understanding', () => {
    roll.results.reactions.deeperUnderstandingUsed = false;
    const before_impact = impact(roll);
    
    roll.results.reactions.deeperUnderstandingUsed = true;
    const after_impact = impact(roll);

    expect(after_impact.points.total.fate).toEqual(before_impact.points.total.fate + 1);
  });

  it('Adds a persona for of course', () => {
    roll.results.reactions.ofCourseUsed = false;
    const before_impact = impact(roll);
    
    roll.results.reactions.ofCourseUsed = true;
    const after_impact = impact(roll);

    expect(after_impact.points.total.persona).toEqual(before_impact.points.total.persona + 1);
  });

  it('Adds a fate for "fate for luck"', () => {
    roll.results.reactions.explodeSixes = false;
    const before_impact = impact(roll);
    
    roll.results.reactions.explodeSixes = true;
    const after_impact = impact(roll);

    expect(after_impact.points.total.fate).toEqual(before_impact.points.total.fate + 1);
  });
});