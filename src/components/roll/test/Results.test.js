import React from 'react';
import renderer from 'react-test-renderer';

import Results from '../Results';

import character from '../../../mock/character';
import roll from '../../../mock/roll';
import preRollDerived from '../../../derivers/roll/pre_roll';

// Consider: this test breaks ALL the time and doesn't really... test anything. I suspect snapshot tests are useful for small components but not for big meaty ones. As Metz would say, depend on things that change less than you do, and this page changes a lot.

describe.skip('Roll Results page', () => {
  it('renders with a typical roll / character setup', () => {
    const tree = renderer
      .create(
        <Results
          rolledDice={roll.results.rolledDice}
          reactions={roll.results.reactions}
          rollSummary={preRollDerived(roll, character)}
          character={character}
          onSetReaction={() => {}}
          disabledOptions={{
            deeperUnderstanding: { wises: [] },
            ofCourse: { wises: [] },
          }}
          resourcesSpent={{fate: 0, persona: 0}}
          />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})

