import React from 'react';

import "./styles/Outcome.css";
import Control from '../shared/Control';
import Toggle from '../shared/Toggle';

const Points = ({ name, points, verb = "Spend" }) => {
  return (
    <li>
      <b>{verb} {points.total[name]}</b> {name}
      <ul className="point-effect-details">
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
      <li>
        <p>
          <b>Mark</b> beneficial use of trait <em>{trait}</em>
        </p>
      </li>
    );
  }
  return "";
}

const Wises = ({ effects }) => {
  return (
    <React.Fragment>
      {
        effects.map(effect => (
          <li>
            <p>
              <b>Mark</b> {effect.mark} use of wise <em>{effect.name}</em>
              {effect.alreadyMarked ? " (already marked)" : ""}
              {effect.advance ? " (ready to advance!)" : ""}
            </p>
          </li>
        ))
      }
    </React.Fragment>
  );
}

const Outcome = ({ impact, operations }) => {
  return (
    <div>
      <ul className="impact-effect-list">
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
        <BeneficialTrait trait={impact.beneficialTrait} />
        <Wises effects={impact.wises} />
        <Toggle
          name="Skill already used this conflict*"

        />
        <li>
          <button
            className="action-button"
            onClick={operations.commitResults}
          >
            Apply outcomes to character
          </button>
        </li>
        <li>
          <button
            className="action-button"
            onClick={operations.reset}
          >
            Reset roll without applying outcomes
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
  );
};

export default Outcome;