import React from 'react';
import PropTypes from 'prop-types';

import PlusMinus from '../shared/PlusMinus';
import Toggle from '../shared/Toggle';
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
      <Toggle key={`gi_${prop.name}`}
        name={prop.text}
        active={this.props.info[prop.name]}
        onToggle={(value) => this.props.onSetProperty(prop.name, value)}
        />
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

GatherInfo.propTypes = {
  character: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
  onSetProperty: PropTypes.func.isRequired,
}

export default GatherInfo;
