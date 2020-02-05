import React from 'react';

import "./styles/Ready.css";

class Ready extends React.Component {

  buildDetail(detail, i) {
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

  render() {
    const details = this.props.derived.details;
    return (
      <div id="roll-ready">
        <ul>
          {details.map(this.buildDetail)}
        </ul>
        <button
          className="action-button"
          onClick={() => {
            this.props.operations.rollDice();
          }}
          >
          Roll the dice!
        </button>
      </div>
    );
  }
}

export default Ready;
