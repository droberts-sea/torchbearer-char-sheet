import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';

// TODO DPR: come up with a more generic way to pass in the test
const Toggle = ({ name, active, test, subtext, onToggle, disabled }) => {
  console.log(name);
  console.log(subtext);
  let className = "toggle";
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
  subtext: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
  // test: PropTypes.shape({ ob: PropTypes.number, skill: PropTypes.string }),
};

export default Toggle;
