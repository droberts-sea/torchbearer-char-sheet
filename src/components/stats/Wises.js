import React from 'react';

import Checkbox from '../shared/Checkbox';

const wiseChekbox = (wise, mark, onMarkTest) => {
  return (
    <td key={`wcb_${wise.name}_${mark}`}>
      <Checkbox
        active={wise.advancement[mark]}
        onToggle={(active) => onMarkTest(wise.name, mark, !active)}
      />
    </td>
  );
}

const buildWise = (wise, onMarkTest) => {
  return (
    <tr key={`wise_${wise.name}`}>
      <td>{wise.name}</td>
      {['pass', 'fail', 'fate', 'persona'].map(
        mark => wiseChekbox(wise, mark, onMarkTest)
      )}
    </tr>
  );
}

const Wises = ({ wises, onMarkTest }) => {
  return (
    <section>
      <h2>Wises</h2>
      <table className="wises-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Pass</th>
            <th>Fail</th>
            <th>Fate</th>
            <th>Pers.</th>
          </tr>
        </thead>
        <tbody>
          {
            wises.map(w => buildWise(w, onMarkTest))
          }
        </tbody>
      </table>

    </section>
  );
};

export default Wises;
