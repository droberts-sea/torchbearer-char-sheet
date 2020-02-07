import React from 'react';
import PropTypes from 'prop-types';

import pluralize from 'pluralize';

import "./styles/Outcome.css";
import Toggle from '../shared/Toggle';
import OutcomeSummary from './OutcomeSummary';

const Points = ({ name, points, verb = "Spend" }) => {
  return (
    <li key={`points_${name}`}>
      <b>{verb} {points.total[name]}</b> {name}
      <ul className="effect-details">
        {
          points[name].map((effect) => (
            <li key={effect.source}>
              {effect.effect} for <em>{effect.source}</em>
            </li>
          ))
        }
      </ul>
    </li>
  );
}

const BeneficialTrait = ({ trait }) => {
  if (trait) {
    return (
      <li key="beneficialTrait">
        <p>
          <b>Mark</b> beneficial use of trait <em>{trait}</em>
        </p>
      </li>
    );
  }
  return "";
}

const MarkEffect = ({ effect }) => {
  return (
    <li key={`me_${effect.category}_${effect.name}`}>
      <b>Mark</b> use of {pluralize.singular(effect.category)} <em>{effect.name}</em>
      <ul className="effect-details">
        <li>
          Mark type: <em>{effect.mark}</em>
          {effect.markComment ? ` (${effect.markComment})` : ""}
        </li>
        {effect.alreadyMarked ? (<li>(already marked)</li>) : ""}
        {effect.advance ? (<li>Ready to advance!</li>) : ""}
      </ul>
    </li>
  )
}

const Outcome = ({ impact, preRoll, postRoll, operations }) => {
  // Page 65
  let outcomeFlavor;
  if (postRoll.outcome === 'pass') {
    outcomeFlavor = "When you pass an ability or skill test, you get what you want. You should offer a little bit of description to celebrate the moment.";
  } else {
    outcomeFlavor = "If a player fails an ability or skill test, one of two things can happen: either a twist is introduced or the character succeeds, but with a condition."
  }
  return (
    <div className="roll-outcome">
      <OutcomeSummary
        outcome={postRoll.outcome}
        ob={preRoll.summary.ob}
        totalSuccesses={postRoll.totalSuccesses}
      />
      <p>{outcomeFlavor}</p>

      <div>
        <h2>Roll Effects</h2>
        <ul className="impact-effect-list">
          <MarkEffect effect={impact.skill} />
          {impact.wises.map(effect => <MarkEffect effect={effect} />)}
          <BeneficialTrait trait={impact.beneficialTrait} />
          <Points
            name="persona"
            points={impact.points}
          />
          <Points
            name="fate"
            points={impact.points}
          />
          <Points
            name="checks"
            points={impact.points}
            verb="Earn"
          />
        </ul>
      </div>

      <div>
        <h2>Next Steps</h2>
        <ul>
          <Toggle
            name="Skill already used this conflict*"
            className="skill-used-already-checkbox"

          />
          <li>
            <button
              className="action-button"
              onClick={operations.commitResults}
            >
              Apply effects to character
          </button>
          </li>
          <li>
            <button
              className="action-button"
              onClick={operations.reset}
            >
              Reset roll without applying effects
          </button>
          </li>
          <li>
            <p>
              *Any time you test an ability multiple times to determine the outcome, only one test is earned toward advancement. Log the first test you earn. That’s the one that counts for this conflict.
          </p><p>
              Exception: If you only need one more of a particular type of test to advance, you can hold off noting your test during a conflict to see if you get the pass or fail that you need to advance.
          </p>
          </li>
        </ul>
      </div>
    </div >
  );
};

Outcome.propTypes = {
  impact: PropTypes.object.isRequired,
  preRoll: PropTypes.object.isRequired,
  postRoll: PropTypes.object.isRequired,
  operations: PropTypes.object.isRequired,
}

export default Outcome;