import React from 'react';

const RollSummary = function(props) {
  return (
    <footer id="roll-summary">
      <label className="label" htmlFor="dice">Dice</label>
      <label className="label" htmlFor="ob">{props.type}</label>
      <label className="label" htmlFor="successes">Successes</label>
      <label className="label" htmlFor="odds">Odds</label>
      <label className="label" htmlFor="expected_margin">Margin</label>

      <span className="number" name="dice">{props.dice}</span>
      <span className="number" name="ob">{props.ob}</span>
      <span className="number" name="successes">
        {props.successes > 0 ? '+' : '' }
        {props.successes}
      </span>
      <span className="number" name="odds">{(props.odds * 100).toFixed()}%</span>
      <span className="number" name="expected_margin">{props.expectedMargin}</span>
    </footer>
  );
};

export default RollSummary;
