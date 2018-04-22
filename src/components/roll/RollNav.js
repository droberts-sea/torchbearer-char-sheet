import React from 'react';

const RollNav = function(props) {
  return (
    <nav id="roll-nav">
      <button
        className="arrow"
        disabled={!props.back.enabled}
        >&lt;</button>

      <h2>{props.currentPage}</h2>
      <button className="cancel">Cancel</button>

      <button
        className="arrow"
        disabled={!props.forward.enabled}
        >&gt;</button>
    </nav>
  );
}

export default RollNav;
