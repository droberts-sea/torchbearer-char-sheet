import React from 'react';
import renderer from 'react-test-renderer';

import OutcomeSummary from '../OutcomeSummary';

describe('OutcomeSummary', () => {
  it('renders with a typical roll outcome', () => {
    const mockPostRoll = {
      outcome: 'pass',
      ob: 4,
      totalSuccesses: 5,
    };
    const tree = renderer
      .create(
        <OutcomeSummary
          postRoll={mockPostRoll}
          />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})
