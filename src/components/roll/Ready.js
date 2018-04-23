import React from 'react';

const Ready = function(props) {
  console.log(props);
  return (
    <ul id="roll-ready">
      {props.derived.details.map((detail, i) => {
        return (
          <li
            key={`detail_${i}`}>
            <p>
              <strong>{detail.effect}</strong>&nbsp;
              from&nbsp;
              <em>{detail.source}</em>&nbsp;
              {detail.reason}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default Ready;
