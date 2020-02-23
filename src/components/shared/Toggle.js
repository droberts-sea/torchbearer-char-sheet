import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';
import Checkbox from './Checkbox';

import './styles/Toggle.css';

// TODO DPR: come up with a more generic way to pass in the test
const Toggle = ({ name, active, test, subtext, onToggle, disabled, className }) => {
  className = (className || "") + " toggle";
  if (active) {
    className += " active";
  }
  if (!test) {
    className += " notest";
  }
  
  const knob = (
    <React.Fragment>
      { test ? (<p>(Ob { test.ob } { test.skill })</p>) : ""}
      <Checkbox onToggle={onToggle} active={active} disabled={disabled} />
    </React.Fragment>
  );

  return (
    <Control
      name={name}
      className={className}
      subtext={subtext}
      knob={knob}
      />
  );
};

Toggle.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  test: PropTypes.object,
  subtext: PropTypes.node,
  onToggle: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default Toggle;
