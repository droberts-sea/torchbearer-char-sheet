import React from 'react';

const RollSummary = function(props) {
  return (
    <footer id="roll-summary">
      <label className="label" htmlFor="dice">Dice</label>
      <label className="label" htmlFor="ob">{props.type}</label>
      <label className="label" htmlFor="odds">Odds</label>

      <span className="number" name="dice">{props.dice}</span>
      <span className="number" name="ob">{props.ob}</span>
      <span className="number" name="odds">{props.odds}%</span>
    </footer>
  );
};

export default RollSummary;
