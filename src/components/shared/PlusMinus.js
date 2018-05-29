import React from 'react';
import PropTypes from 'prop-types';

import './styles/PlusMinus.css';

const PlusMinus = function({ name, subtext, value, min, max, onValueChange }) {
  return (
    <li className="control plus-minus">
      <div>
        <h3>{name}</h3>
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
      </div>
      { subtext ? (<p>{subtext}</p>) : "" }
    </li>
  );
};

PlusMinus.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
  subtext: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default PlusMinus;
