import React from 'react';
import PropTypes from 'prop-types';

const RollNav = function({ status, onGotoPage, onResetRoll }) {
  return (
    <nav id="roll-nav">
      <button
        className="arrow"
        disabled={status.back.disabled}
        onClick={() => onGotoPage(status.back.target)}
        >&lt;</button>

      <h2>{status.pageName}</h2>
      <button
        className="reset"
        onClick={onResetRoll}
        >Reset</button>

      <button
        className="arrow"
        disabled={status.forward.disabled}
        onClick={() => onGotoPage(status.forward.target)}
        >&gt;</button>
    </nav>
  );
};

RollNav.propTypes = {
  status: PropTypes.object.isRequired,
  onGotoPage: PropTypes.func.isRequired,
  onResetRoll: PropTypes.func.isRequired,
};

export default RollNav;
