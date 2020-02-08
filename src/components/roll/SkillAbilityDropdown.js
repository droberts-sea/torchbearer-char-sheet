import React from 'react';
import PropTypes from 'prop-types';

import Control from '../shared/Control';

import './styles/SkillAbilityDropdown.css';

class SkillAbilityDropdown extends React.Component {
  abilities() {
    return (
      <optgroup label="Abilities">
        {Object.keys(this.props.character.abilities).map((name) => {
          const ability = this.props.character.abilities[name];
          return (
            <option
              key={`sd_${name}`}
              value={name}
              >
              {ability.name} ({ability.rating})
            </option>
          );
        })}
      </optgroup>
    )
  }

  trainedSkills() {
    const skills = this.props.character.skills;
    const trainedSkills = Object.keys(skills).filter((name) => {
      return skills[name].open;
    });
    return (
      <optgroup label="Trained Skills">
        {trainedSkills.map((name) => {
          return (
            <option
              key={`sd_${name}`}
              value={name}
              >
              {skills[name].name} ({skills[name].rating})
            </option>
          );
        })}
      </optgroup>
    );
  }

  untrainedSkills() {
    const skills = this.props.character.skills;
    const abilities = this.props.character.abilities;
    const untrainedSkills = Object.keys(skills).filter((name) => {
      return !skills[name].open;
    });
    return (
      <optgroup label="Beginner's Luck">
        {untrainedSkills.map((name) => {
          const bl = abilities[skills[name].beginnersLuck];
          return (
            <option
              key={`sd_${name}`}
              value={name}
              >
              {skills[name].name}&nbsp;
              ({bl.name[0]} - {bl.rating})
            </option>
          );
        })}
      </optgroup>
    );
  }

  render () {
    const {
      name = "Skill / Ability",
      current = "default",
      className,
      onSelectSkill,
      character,
      extraKnob,
      ...props
    } = this.props;
    // NB The dropdown menu looks like garbage in chrome's dev tools,
    // but on a real mobile browser the default styles are pretty solid
    return (
      <Control
        {...props}
        className={className + " skill-ability-dropdown"}
        name={name}
        knob={(<>
          <select
            value={current}
            onChange={(event) => {this.props.onSelectSkill(event.target.value)}}
            >
            <option key="default" value="default" disabled={true}>
              -- Choose One --
            </option>

            {this.abilities()}
            {this.trainedSkills()}
            {this.untrainedSkills()}
          </select>
          {this.props.extraKnob}
        </>)}
        />
    );
  }
}

SkillAbilityDropdown.propTypes = {
  name: PropTypes.string,
  current: PropTypes.string,
  onSelectSkill: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired,
  extraKnob: PropTypes.node,
};

export default SkillAbilityDropdown;
