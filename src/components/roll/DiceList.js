import React from 'react';
import PropTypes from 'prop-types';

import _ from 'underscore';

import diceImages from './images/diceImages';

import './styles/DiceList.css';

const DiceList = ({ dice, name, extra }) => {
  let count = dice.length.toString();
  let successDice = "";
  if (extra || extra === 0) {
    count += ' ';
    count += extra >= 0 ? '+' : '-';
    count += ' ' + Math.abs(extra);
    count += ' = ' + (dice.length + extra);
    if (extra > 0) {
      successDice = _.times(extra, i => (
        <li
          className="die-image-container free-success"
          key={'s_' + i}
        >
          <label>S</label>
        </li>
      ))
    }
  }
  return (
    <div className="dice-list">
      <h2>
        {name + ' '}
        ({count})
      </h2>
      <ul>
        {successDice}
        {
          dice.map((die, i) => {
            let className = "die-image-container" + (die.rerolled ? " rerolled" : "");
            if (i >= dice.length + extra) {
              className += " cancelled";
            }
            return (
              <li
                className={className}
                key={die.id}
              >
                <img
                  src={diceImages[die.face]}
                  alt={`die-${die.face}`}
                />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

DiceList.propTypes = {
  dice: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  extra: PropTypes.number,
};

export default DiceList;