import React from 'react';
import renderer from 'react-test-renderer';

import OutcomeSummary from '../OutcomeSummary';

describe('OutcomeSummary', () => {
  it('renders with a typical roll outcome', () => {
    const tree = renderer
      .create(
        <OutcomeSummary
          outcome="pass"
          ob={4}
          totalSuccesses={5}
          />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})
