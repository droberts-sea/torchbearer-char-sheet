import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';

import './styles/Toggle.css';

// TODO DPR: come up with a more generic way to pass in the test
const Toggle = ({ name, active, test, subtext, onToggle, disabled }) => {
  let className = "control toggle";
  if (active) {
    className += " active";
  }
  if (!test) {
    className += " notest";
  }
  return (
    <li className={className}>
      <div>
        <h3>{ name }</h3>
        { test ? (<p>(Ob { test.ob } { test.skill })</p>) : ""}
        <Checkbox onToggle={onToggle} active={active} disabled={disabled} />
      </div>
      { subtext ? (<p>{ subtext }</p>) : "" }
    </li>
  );
};

Toggle.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  test: PropTypes.object,
  subtext: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default Toggle;
