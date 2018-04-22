import React from 'react';

import Checkbox from '../shared/Checkbox';
import PlusMinus from '../shared/PlusMinus';
import SkillAbilityDropdown from './SkillAbilityDropdown';

class GatherInfo extends React.Component {
  propertyToggles() {
    const properties = [
      {
        name: 'inNature',
        text: "Within Nature"
      },
      {
        name: 'isVersus',
        text: 'Versus Test'
      },
      {
        name: 'isInstinct',
        text: 'Instinct Test'
      },
      {
        name: 'isRecovery',
        text: 'Recovery Test'
      },
      {
        name: 'isDisposition',
        text: 'Disposition Test'
      }
    ];
    return properties.map((prop) => (
      <li key={`gi_${prop.name}`}>
        <h3>{prop.text}</h3>
        <Checkbox
          active={this.props.info[prop.name]}
          onToggle={(value) => this.props.onSetProperty(prop.name, value)}
          />
      </li>
    ));
  }
  render() {
    return (
      <ul id="roll-gather-info">
        <li>
          <h3>Obstacle</h3>
          <PlusMinus
            value={this.props.info.ob}
            min={0}
            onValueChange={(ob) => this.props.onSetProperty('ob', ob)}
            />
        </li>
        <li>
          <h3>Skill / Ability</h3>
          <SkillAbilityDropdown
            character={this.props.character}
            current={this.props.info.skill}
            onSelectSkill={(skill) => this.props.onSetProperty('skill', skill)}
            />
        </li>
        {this.propertyToggles()}
      </ul>
    );
  }
}

export default GatherInfo;
