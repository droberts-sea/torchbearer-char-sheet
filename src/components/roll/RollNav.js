import React from 'react';

const RollNav = function(props) {
  return (
    <nav id="roll-nav">
      <button
        className="arrow"
        disabled={!props.back.enabled}
        onClick={() => props.onGotoPage(props.back.target)}
        >&lt;</button>

      <h2>{props.currentPage}</h2>
      <button
        className="reset"
        onClick={props.reset}
        >Reset</button>

      <button
        className="arrow"
        disabled={!props.forward.enabled}
        onClick={() => props.onGotoPage(props.forward.target)}
        >&gt;</button>
    </nav>
  );
};



export default RollNav;
