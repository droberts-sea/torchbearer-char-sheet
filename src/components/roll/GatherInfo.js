import React from 'react';

import Checkbox from '../shared/Checkbox';
import PlusMinus from '../shared/PlusMinus';
import SkillAbilityDropdown from './SkillAbilityDropdown';

const GatherInfo = function(props) {
  return (
    <ul id="roll-gather-info">
      <li>
        <h3>Versus test</h3>
        <Checkbox
          active={props.info.type === 'versus'}
          onToggle={() => {props.onSetVersus(props.info.type !== 'versus')}}
          />
      </li>
      <li>
        <h3>Obstacle</h3>
        <PlusMinus
          value={props.info.ob}
          min={0}
          onValueChange={props.onSetOb}
          />
      </li>
      <li>
        <h3>Skill / Ability</h3>
        <SkillAbilityDropdown
          character={props.character}
          current={props.info.skill}
          onSelectSkill={props.onSelectSkill}
          />
      </li>
    </ul>
  );
}

export default GatherInfo;
