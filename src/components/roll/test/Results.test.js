import React from 'react';
import renderer from 'react-test-renderer';

import Results from '../Results';

import character from '../../../mock/character';
import roll from '../../../mock/roll';
import calculateDerivedRollState from '../../../derivers/roll/derived_state';

describe('Roll Results page', () => {
  it('renders with a typical roll / character setup', () => {
    const tree = renderer
      .create(
        <Results
          rolledDice={roll.results.rolledDice}
          reactions={roll.results.reactions}
          rollSummary={calculateDerivedRollState(roll, character)}
          characterWises={character.wises}
          onSetReaction={() => {}}
          />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})

