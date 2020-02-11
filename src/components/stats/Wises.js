import React from 'react';

import Checkbox from '../shared/Checkbox';
import EditablePropertyName from '../shared/EditablePropertyName';

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

const buildWise = (wise, index, actions, editMode) => {
  return (
    <tr key={`wise_${wise.id}`}>
      <td>
        <EditablePropertyName
          name={wise.name}
          editMode={editMode}
          onEdit={(value) => actions.editCharacterProperty(value, 'wises', index, 'name')}
          onRemove={() => actions.editCharacterRemoveField('wises', index)}
        />
      </td>
      {['pass', 'fail', 'fate', 'persona'].map(
        mark => wiseChekbox(wise, mark, actions.onMarkTest)
      )}
    </tr>
  );
}

const Wises = ({ wises, actions, editMode }) => {
  let classes = ['wises-table'];
  if (editMode) {
    classes.push('editing');
  }

  return (
    <section>
      <h2>Wises</h2>
      <table className={classes.join(' ')}>
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
            wises.map((w, i) => buildWise(w, i, actions, editMode))
          }
          {
            editMode ? (
              <tr><td>
                <button onClick={() => actions.editCharacterAddField('wises')}>+</button>
              </td></tr>
            ) : null
          }
        </tbody>
      </table>

    </section>
  );
};

export default Wises;
