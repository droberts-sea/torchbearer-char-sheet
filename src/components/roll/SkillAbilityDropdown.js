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
              ({bl.name[0]} - {bl.rating})
            </option>
          );
        })}
      </optgroup>
    );
  }

  render () {
    // NB The dropdown menu looks like garbage in chrome's dev tools,
    // but on a real mobile browser the default styles are pretty solid
    const value = this.props.current || "default";
    return (
      <select className="skill-ability-dropdown"
        value={value}
        onChange={(event) => {this.props.onSelectSkill(event.target.value)}}
        >
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
