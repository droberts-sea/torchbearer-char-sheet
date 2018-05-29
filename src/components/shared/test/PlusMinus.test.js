import React from 'react';
import renderer from 'react-test-renderer';

import PlusMinus from '../PlusMinus';

it('renders with all props', () => {
  const tree = renderer
  .create(
    <PlusMinus
      name="Test plus minus"
      value={3}
      onValueChange={jest.fn()}
      subtest="test subtext for the component"
      min={0}
      max={4}
      />
  )
  .toJSON();
  expect(tree).toMatchSnapshot();
});

it('disables buttons at boundaries', () => {
  const tree = renderer
  .create(
    <div>
      <PlusMinus
        name="plus minus at min"
        value={0}
        onValueChange={jest.fn()}
        min={0}
        max={4}
        />
      <PlusMinus
        name="plus minus at max"
        value={4}
        onValueChange={jest.fn()}
        min={0}
        max={4}
        />
    </div>
  )
  .toJSON();
  expect(tree).toMatchSnapshot();
});
