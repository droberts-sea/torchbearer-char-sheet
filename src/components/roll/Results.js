import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

import diceImages from './images/diceImages';

import './styles/Results.css';
import Control from '../shared/Control';

const DiceList = ({ dice, name }) => {
  return (
    <div className="dice-list">
      <h2>
        {name + ' '}
        ({dice.length})
      </h2>
      <ul>
        {
          dice.map(die => {
            return (
              <li
                className="die-image-container"
                key={die.id}
              >
                <img
                  src={diceImages[die.face]}
                  className="die-image"
                />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

const UseButton = ({name, reactions, onSetReaction}) => {
  return (
    <button
      disabled={reactions[name]}
      onClick={() => onSetReaction(name, true)}
    >
      Use
    </button>
  )
}

const WiseList = ({ characterWises, selectedWise, onSelectWise }) => {
  return (
    <select
      value={selectedWise}
      onChange={event => onSelectWise(event.target.value)}
    >
      <option key="none" value="none">
        Wise - None
      </option>
      {
        characterWises.map(wise => {
          return (
            <option
              key={`wise_${wise.name}`}
              value={wise.name}
            >
              {wise.name}
            </option>
          );
        })
      }
    </select>
  );
};

const WiseReaction = ({ name, subtext, reactionName, reactions, characterWises, onSetReaction }) => {
  return (
    <Control
      className="roll-reaction"
      name={name}
      subtext={subtext}
      knob={(
        <React.Fragment>
          <WiseList
            characterWises={characterWises}
            selectedWise={reactions[reactionName + 'Wise']}
            onSelectWise={wise => {
              onSetReaction(reactionName + 'Wise', wise)
            }}
          />
          <UseButton
            name={reactionName + 'Used'}
            reactions={reactions}
            onSetReaction={onSetReaction}
          />
        </React.Fragment>
      )}
    />
  );
};

const Results = ({ rolledDice, reactions, characterWises, onSetReaction }) => {
  console.log("Rendering results");
  console.log(reactions);
  let dice = rolledDice.sort(
    (a, b) => Math.sign(b.face - a.face)
  );
  const { successes, scoundrels } = _.groupBy(dice,
    d => d.face > 3 ? "successes" : "scoundrels"
  );

  return (
    <div
      className="roll-results"
    >
      <DiceList
        dice={successes}
        name="Successes" />
      <DiceList
        dice={scoundrels}
        name="Scoundrels" />
      <h2>Reactions</h2>
      <ul>
        <Control
          className="roll-reaction"
          name="Fate for Luck"
          subtext="Spend one fate to explode all sixes. Sixes rolled this way also explode. Describe the Luck!"
          knob={(
            <UseButton
              name="explodeSixes"
              reactions={reactions}
              onSetReaction={onSetReaction}
            />
          )}
        />
        <WiseReaction
          name="Deeper Understanding"
          subtext="Spend a fate point and reroll any single failed die on a test related to your wise. State, “Ah hah!” and gesture that you understand everything now."
          reactionName="deeperUnderstanding"
          reactions={reactions}
          characterWises={characterWises}
          onSetReaction={onSetReaction}
        />
        <WiseReaction
          name="Of Course"
          subtext="Spend a persona point and reroll all failed dice on a test related to your wise. Declare, “Of course!” and indicate that you were wrong before but you have it all correct now."
          reactionName="ofCourse"
          reactions={reactions}
          characterWises={characterWises}
          onSetReaction={onSetReaction}
        />
      </ul>
      {/* TODO: tiebreakers */}
      {/* <button>Accept Results</button> */}
    </div>
  );
}

Results.propTypes = {

};

export default Results;