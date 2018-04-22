import React from 'react';

const SkillAbilityDropdown = function(props) {
  const value = props.current || "default";
  console.log(`Rendering dropdown with value ${value}`);
  return (
    <select value={value}
      onChange={(event) => {props.onSelectSkill(event.target.value)}}>
      <option key="default" value="default" disabled={true}>
        -- Choose One --
      </option>

      <optgroup label="Abilities">
        {Object.keys(props.character.abilities).map((name) => {
          const ability = props.character.abilities[name];
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

      <optgroup label="Trained Skills">
      </optgroup>

      <optgroup label="Untrained Skills">
      </optgroup>
    </select>
  );
}

export default SkillAbilityDropdown;
