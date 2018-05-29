import React from 'react';
import renderer from 'react-test-renderer';

import Toggle from '../Toggle';

it('renders when active', () => {
  const tree = renderer
  .create(
    <Toggle
      name="Test toggle"
      subtext="some subtext for a toggle"
      active={true}
      onToggle={jest.fn()}
      />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when inactive', () => {
  const tree = renderer
  .create(
    <Toggle
      name="Test toggle"
      subtext="some subtext for a toggle"
      active={false}
      onToggle={jest.fn()}
      />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when disabled', () => {
  const tree = renderer
  .create(
    <Toggle
      name="Test toggle"
      subtext="some subtext for a toggle"
      active={false}
      disabled={true}
      onToggle={jest.fn()}
      />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
