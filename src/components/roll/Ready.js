import React from 'react';

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
      <ul id="roll-ready">
        {details.map(this.buildDetail)}
      </ul>
    );
  }
}

export default Ready;
