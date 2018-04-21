import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../shared/Checkbox';

const Condition = ({ name, active, test, effect, onToggle }) => {
  let className = "condition";
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
        <Checkbox onToggle={onToggle} active={active} />
      </div>
      <p>{ effect }</p>
    </li>
  );
};

Condition.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  effect: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  // test: PropTypes.shape({ ob: PropTypes.number, skill: PropTypes.string }),
};

export default Condition;
