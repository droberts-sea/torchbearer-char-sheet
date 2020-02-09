import React from 'react';
import PropTypes from 'prop-types';

import pluralize from 'pluralize';

import "./styles/Outcome.css";
import Toggle from '../shared/Toggle';
import OutcomeSummary from './OutcomeSummary';
import WiseAdvancement from './WiseAdvancement';

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

// Thanks to https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

const MarkEffect = ({ effect }) => {
  // TODO something in here is missing a key, but I can't figure out what.
  return (
    <li key={`me_${effect.category}_${effect.name}`}>
      <div key="description">
      <ConditionalWrapper
        condition={effect.ignored}
        wrapper={n => <strike>{n}</strike>}
      >
        <b>Mark</b> use of {pluralize.singular(effect.category)} <em>{effect.name}</em>
      </ConditionalWrapper>
      </div>
      <ul className="effect-details" key="details">
        <li key="type">
          Mark type: <em>{effect.mark}</em>
          {effect.markComment ? ` (${effect.markComment})` : ""}
        </li>
        {effect.alreadyMarked ? (<li key="am">(already marked)</li>) : ""}
        {effect.advance ? (<li key="adv">Ready to advance!</li>) : ""}
        {effect.ignored ? (<li key="ign"><b>Ignored</b> due to <em>{effect.ignored}</em></li>) : ""}
      </ul>
    </li>
  )
}

const TaxNature = ({ tax }) => {
  if (tax) {
    return (
      <li key={`tax_nature`}>
        <b>Tax</b> <em>Nature</em> by <b>{tax.total}</b>
        <ul className="effect-details">
          <li>Cause: {tax.source}</li>
          {tax.willDeplete ? (<li>This will deplete Nature, reducing its untaxed rating by 1. Your character freaks out a little!</li>) : ""}
        </ul>
      </li>
    );
  } else {
    return "";
  }
};

const Outcome = ({ outcome, impact, postRoll, character, onSetOutcome, onSetWiseAdvancement, operations }) => {
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
        postRoll={postRoll}
      />
      <p>{outcomeFlavor}</p>

      <div>
        <h2>Roll Effects</h2>
        <ul className="impact-effect-list">
          <MarkEffect effect={impact.skill} />
          {impact.wises.map(effect => <MarkEffect effect={effect} />)}
          <BeneficialTrait trait={impact.beneficialTrait} />
          <Points
            name="fate"
            points={impact.points}
          />
          <Points
            name="persona"
            points={impact.points}
          />
          <Points
            name="checks"
            points={impact.points}
            verb="Earn"
          />
          <TaxNature tax={impact.taxNature} />
        </ul>
      </div>

      <div>
        <h2>Next Steps</h2>
        <ul>
          <Toggle
            name="Skill already used this conflict*"
            className="skill-used-already-checkbox"
            active={outcome.skillAlreadyTested}
            onToggle={active => onSetOutcome('skillAlreadyTested', active)}
          />
          {
            impact.wises.map(wise => {
              if (wise.advance) {
                const advancement = outcome.wiseAdvancement.find(
                  adv => adv.name === wise.name
                );
                if (!advancement) {
                  throw new Error(`No matching wise advancement found in the roll outcome for advancing wise ${wise.name}`);
                }
                return (
                  <li key={`wise_adv_${wise.name}`}>
                    <WiseAdvancement
                      wise={wise}
                      character={character}
                      wiseAdvancement={advancement}
                      onSetWiseAdvancement={(prop, value) => onSetWiseAdvancement(wise.name, prop, value)}
                    />
                  </li>
                );
              }
              return "";
            })
          }
          {/* TODO widget for depleted nature */}
          {/* TODO disable until all impact tasks are delt with */}
          <li key="commit-button">
            <button
              className="action-button"
              onClick={() => operations.commitResults(impact, outcome)}
            >
              Apply effects to character
          </button>
          </li>
          <li key="reset-button">
            <button
              className="action-button"
              onClick={operations.reset}
            >
              Reset roll without applying effects
            </button>
          </li>
          <li key="subtext">
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
  outcome: PropTypes.object.isRequired,
  impact: PropTypes.object.isRequired,
  postRoll: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
  onSetOutcome: PropTypes.func.isRequired,
  onSetWiseAdvancement: PropTypes.func.isRequired,
  operations: PropTypes.object.isRequired,
}

export default Outcome;