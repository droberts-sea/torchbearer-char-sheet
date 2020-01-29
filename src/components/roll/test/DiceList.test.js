import React from 'react';
import renderer from 'react-test-renderer';

import DiceList from '../DiceList';

describe('DiceList', () => {
  const dice = [
    {id: 0, face: 6, rerolled: false},
    {id: 1, face: 6, rerolled: false},
    {id: 2, face: 5, rerolled: false},
    {id: 3, face: 4, rerolled: false},
  ];

  it('Renders without rerolls or extra successes', () => {
    const tree = renderer
      .create(
        <DiceList
          dice={dice}
          name="Successes"
          />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders with extra successes', () => {
    const tree = renderer
      .create(
        <DiceList
          dice={dice}
          name="Successes"
          extra={2}
          />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders with negative successes', () => {
    const tree = renderer
      .create(
        <DiceList
          dice={dice}
          name="Successes"
          extra={-2}
          />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders with no dice', () => {
    const tree = renderer
      .create(
        <DiceList
          dice={[]}
          name="Successes"
          />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders with rerolls', () => {
    const diceCopy = JSON.parse(JSON.stringify(dice));
    diceCopy[0].rerolled = true;
    diceCopy[2].rerolled = true;
    const tree = renderer
      .create(
        <DiceList
          dice={diceCopy}
          name="Successes"
          />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})

