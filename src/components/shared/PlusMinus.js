import React from 'react';

const PlusMinus = function(props) {
  return (
    <div className="plus-minus">
      <button
        onClick={() => props.onValueChange(props.value - 1)}
        disabled={props.value <= props.min}
        >-</button>
      <span className="number">{props.value}</span>
      <button
        onClick={() => props.onValueChange(props.value + 1)}
        disabled={props.value >= props.max}
        >+</button>
    </div>
  );
};

export default PlusMinus;
