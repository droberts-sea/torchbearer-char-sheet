import React from 'react';

import "./styles/Ready.css";

const buildDetail = (detail, i) => {
  return (
    <li
      key={`detail_${i}`}>
      <p>
        <strong>{detail.effect}</strong>
        &nbsp;from&nbsp;
        <em>{detail.source}</em>
        <br></br>
        <span className="reason">{detail.reason}</span>
      </p>
    </li>
  );
}

const Ready = ({ details, rollDice }) => {
  return (
    <div id="roll-ready">
      <ul>
        {details.map(buildDetail)}
      </ul>
      <button
        className="action-button"
        onClick={rollDice}
      >
        Roll the dice!
        </button>
    </div>
  );
}

export default Ready;
