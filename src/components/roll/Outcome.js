import React from 'react';

import "./styles/Outcome.css";

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

const Outcome = ({ impact }) => {
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
      </ul>
    </div>
  );
};

export default Outcome;