import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../shared/Checkbox';
import EditablePropertyName from '../shared/EditablePropertyName';

const wiseChekbox = (wise, mark, markTest) => {
  return (
    <td key={`wcb_${wise.name}_${mark}`}>
      <Checkbox
        active={wise.advancement[mark]}
        onToggle={(active) => markTest(wise.name, mark, !active)}
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
        mark => wiseChekbox(wise, mark, actions.markTest)
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

Wises.propTypes = {
  wises: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    markTest: PropTypes.func.isRequired,
    editCharacterProperty: PropTypes.func.isRequired,
    editCharacterAddField: PropTypes.func.isRequired,
    editCharacterRemoveField: PropTypes.func.isRequired,
  }).isRequired,
  editMode: PropTypes.bool,
};

export default Wises;
