import React from 'react';
import renderer from 'react-test-renderer';

import SkillAbilityDropdown from '../SkillAbilityDropdown';

import character from '../../../mock/character';

it('renders with no skill selected', () => {
  const tree = renderer
    .create(
      <SkillAbilityDropdown
        character={character}
        onSelectSkill={skill => skill}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with a trained skill selected', () => {
  const tree = renderer
    .create(
      <SkillAbilityDropdown
        current="ORATOR"
        character={character}
        onSelectSkill={skill => skill}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
