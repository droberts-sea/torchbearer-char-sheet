import React from 'react';

const Points = ({ name, points, total, verb = "spent" }) => {
  return (
    <li>
      <b>{total}</b> {name} {verb}
      <ul>
        {
          points.map((effect) => (
            <li key={effect.source}>
              {effect.effect} for {effect.source}
            </li>
          ))
        }
      </ul>
    </li>
  );
}

const Outcome = ({ impact }) => {
  return (
    <div>
      <Points
        name="persona"
        points={impact.points.persona}
        total={impact.points.total.persona}
        />
    </div>
  );
};

export default Outcome;