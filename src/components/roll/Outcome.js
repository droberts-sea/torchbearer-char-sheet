import React from 'react';
import pluralize from 'pluralize';

import "./styles/Outcome.css";
import Toggle from '../shared/Toggle';

const Points = ({ name, points, verb = "Spend" }) => {
  return (
    <li>
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
      <li>
        <p>
          <b>Mark</b> beneficial use of trait <em>{trait}</em>
        </p>
      </li>
    );
  }
  return "";
}

const MarkEffect = ({ effect }) => {
  console.log(effect);
  return (
    <li key={`me_${effect.category}_${effect.name}`}>
      <p>
        <b>Mark</b> use of {pluralize.singular(effect.category)} <em>{effect.name}</em>
        <ul className="effect-details">
          <li>Mark type: <em>{effect.mark}</em></li>
          {effect.alreadyMarked ? (<li>(already marked)</li>) : ""}
          {effect.advance ? (<li>Ready to advance!</li>) : ""}
        </ul>
      </p>
    </li>
  )
}

const Outcome = ({ impact, operations }) => {
  return (
    <div>
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