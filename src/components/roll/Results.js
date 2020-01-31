import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

import './styles/Results.css';
import Control from '../shared/Control';
import DiceList from './DiceList';

const UseButton = ({ name, onSetReaction, disabled = false }) => {
  return (
    <button
      disabled={disabled}
      onClick={() => onSetReaction(name, true)}
      className="use-button"
    >
      Use
    </button>
  )
};

const WiseList = ({ characterWises, selectedWise = "none", onSelectWise, disabled, disabledWises }) => {
  return (
    <select
      value={selectedWise}
      onChange={event => onSelectWise(event.target.value)}
      disabled={disabled}
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
              disabled={disabledWises.includes(wise.name)}
            >
              {wise.name}
            </option>
          );
        })
      }
    </select>
  );
};

WiseList.propTypes = {
  characterWises: PropTypes.array.isRequired,
  selectedWise: PropTypes.string,
  onSelectWise: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  disabledWises: PropTypes.array.isRequired,
}

const WiseReaction = ({ name, subtext, reactionName, reactions, characterWises, onSetReaction, disabledOptions }) => {
  const selectedWise = reactions[reactionName + 'Wise'];
  return (
    <Control
      className="roll-reaction wise-reaction"
      name={name}
      subtext={subtext}
      knob={(
        <React.Fragment>
          <UseButton
            name={reactionName + 'Used'}
            onSetReaction={onSetReaction}
            disabled={disabledOptions.button}
          />
          <WiseList
            characterWises={characterWises}
            selectedWise={selectedWise}
            onSelectWise={wise => {
              onSetReaction(reactionName + 'Wise', wise)
            }}
            disabled={disabledOptions.select}
            disabledWises={disabledOptions.wises}
          />

        </React.Fragment>
      )}
    />
  );
};

const Outcome = ({ outcome, rollSummary, totalSuccesses }) => {
  return (
    <footer className="outcome">
      <h2>Outcome: {outcome}</h2>

      <div className="outcome-stats">
        <label htmlFor="ob">
          Obstacle
        </label>
        <label htmlFor="successes">
          Successes
        </label>
        <label htmlFor="margin">
          Margin
        </label>
        <span className="number" name="ob">
          {rollSummary.ob}
        </span>
        <span className="number" name="successes">
          {totalSuccesses}
        </span>
        <span className="number" name="margin">
          {totalSuccesses - rollSummary.ob}
        </span>
      </div>

      <button>Accept Results</button>
    </footer>
  )
};

const Results = ({ rolledDice, reactions, rollSummary, character, onSetReaction, disabledOptions, resourcesSpent }) => {
  const dice = rolledDice.sort(
    (a, b) => Math.sign(b.face - a.face)
  );
  const { successes, scoundrels } = _.groupBy(dice,
    d => d.face > 3 ? "successes" : "scoundrels"
  );

  const totalSuccesses = successes.length + rollSummary.addSuccesses;
  const outcome = totalSuccesses >= rollSummary.ob ? 'success' : 'failure';

  const availableFate = character.points.fate.available - resourcesSpent.fate;
  const availablePersona = character.points.persona.available - resourcesSpent.persona;

  return (
    <div
      className="roll-results"
    >
      <section className="pre-footer">
        <DiceList
          dice={successes}
          name="Successes"
          extra={rollSummary.addSuccesses} />
        <DiceList
          dice={scoundrels}
          name="Scoundrels" />
        <h2>Reactions</h2>
        <ul>
          <WiseReaction
            name="Deeper Understanding"
            subtext={(
              <React.Fragment>
                Spend a fate point and reroll any single failed die on a test related to your wise. State, “Ah hah!” and gesture that you understand everything now.
                <br /><br />
                <strong>
                  {availableFate}
                  &nbsp;fate available
                </strong>
              </React.Fragment>
            )}
            reactionName="deeperUnderstanding"
            reactions={reactions}
            characterWises={character.wises}
            onSetReaction={onSetReaction}
            disabledOptions={disabledOptions.deeperUnderstanding}
          />
          <WiseReaction
            name="Of Course"
            subtext={(
              <React.Fragment>
                Spend a persona point and reroll all failed dice on a test related to your wise. Declare, “Of course!” and indicate that you were wrong before but you have it all correct now.
              <br /><br />
                <strong>
                  {availablePersona}
                  &nbsp;persona available
                </strong>
              </React.Fragment>
            )}
            reactionName="ofCourse"
            reactions={reactions}
            characterWises={character.wises}
            onSetReaction={onSetReaction}
            disabledOptions={disabledOptions.ofCourse}
          />
          <Control
            className="roll-reaction"
            name="Fate for Luck"
            subtext={(
              <React.Fragment>
                Spend a fate point and reroll all sixes. Sixes rolled this way keep rerolling. Describe the Luck!
              <br /><br />
                <strong>
                  {availableFate}
                  &nbsp;fate available
                </strong>
              </React.Fragment>
            )}
            knob={(
              <UseButton
                name="explodeSixes"
                disabled={disabledOptions.explodeSixes}
                onSetReaction={onSetReaction}
              />
            )}
          />
          {/* TODO: tiebreakers */}
          <section className="reaction-log">
            <h3>Log</h3>
            <ul>{
              reactions.log.map((logLine, i) => (
                <li className="log-line" key={i}><p>{logLine}</p></li>
              ))
            }</ul>
          </section>
        </ul>
      </section>
      <Outcome
        outcome={outcome}
        totalSuccesses={totalSuccesses}
        rollSummary={rollSummary} />
    </div>
  );
};

Results.propTypes = {
  rolledDice: PropTypes.array.isRequired,
  reactions: PropTypes.object.isRequired,
  rollSummary: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
  onSetReaction: PropTypes.func.isRequired,
  disabledOptions: PropTypes.object.isRequired,
};

export default Results;