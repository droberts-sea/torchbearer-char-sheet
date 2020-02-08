import React from 'react';
import PropTypes from 'prop-types';

import Control from './Control';

import './styles/PlusMinus.css';

const PlusMinus = function({ name, subtext, value, min, max, onValueChange }) {
  const knob = (
    <div>
      <button
        onClick={() => onValueChange(value - 1)}
        disabled={value <= min}
        >-</button>
      <span className="number">{value}</span>
      <button
        onClick={() => onValueChange(value + 1)}
        disabled={value >= max}
        >+</button>
    </div>
  );
  return (
    <Control
      className="plus-minus"
      name={name}
      subtext={subtext}
      knob={knob}
      />
  );
};

PlusMinus.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
  subtext: PropTypes.node,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default PlusMinus;
