import React from 'react';
import PropTypes from 'prop-types';

import Control from '../shared/Control';
import Checkbox from '../shared/Checkbox';

import './styles/TraitDropdown.css';

const checkboxClickHandler = (value, checked) => {
  console.log(`someone clicked on ${value}, setting it to ${checked}`);
}

const TraitOption = ({ name, text, ...props }) => {
  return (
    <div className="trait-option">
      <Checkbox
        {...props}
        onToggle={(checked) => checkboxClickHandler(name, checked)}
        id={name}
      />
      <label htmlFor={name}>{text}</label>
    </div>
  );
}

const TraitOptions = (props) => {
  return (
    <React.Fragment>
      <TraitOption
        name="benefit"
        text="+1D Benefit"
        active={true}
      />
      <TraitOption
        name="penalty"
        text="-1D Penalty"
        active={false}
      />
      <TraitOption
        name="opponent"
        text="+2D to Opponent"
        active={false}
      />
    </React.Fragment>
  );
}

const TraitDropdown = (props) => {
  const value = props.current || "none";
  return (
    <Control
      className="trait-dropdown"
      name="Trait"
      knob={(
        <React.Fragment>
          <select
            value={value}
            onChange={(event) => {
              console.log("trait selected");
            }}
          >
            <option key="none" value="none">
              None
            </option>
          </select>
          <TraitOptions {...props} />
        </React.Fragment>
      )}
    />
  );
};

export default TraitDropdown;