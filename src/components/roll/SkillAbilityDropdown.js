import React from 'react';

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
              ({bl.name} - {bl.rating})
            </option>
          );
        })}
      </optgroup>
    );
  }

  render () {
    const value = this.props.current || "default";
    console.log(`Rendering dropdown with value ${value}`);
    return (
      <select value={value}
        onChange={(event) => {this.props.onSelectSkill(event.target.value)}}>
        <option key="default" value="default" disabled={true}>
          -- Choose One --
        </option>

        {this.abilities()}
        {this.trainedSkills()}
        {this.untrainedSkills()}
      </select>
    );
  }
}

export default SkillAbilityDropdown;
