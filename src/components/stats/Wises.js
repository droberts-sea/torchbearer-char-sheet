import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../shared/Checkbox';
import EditablePropertyName from '../shared/EditablePropertyName';

import './styles/Wises.css';
import ErrorRow from '../shared/ErrorRow';

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

const buildWise = (wise, index, actions, editMode, errors = {}) => {
  let checkboxes = null;
  if (!editMode) {
    checkboxes = ['pass', 'fail', 'fate', 'persona'].map(
      mark => wiseChekbox(wise, mark, actions.markTest)
    );
  }

  return (
    <React.Fragment key={`wise_${wise.id}`}>
      <tr key={`wise_${wise.id}_info`}>
        <td>
          <EditablePropertyName
            name={wise.name}
            editMode={editMode}
            onEdit={(value) => actions.editCharacterProperty(value, 'wises', index, 'name')}
            onRemove={() => actions.editCharacterRemoveField('wises', index)}
            errors={errors.name}
          />
        </td>
        {checkboxes}
      </tr>
      <ErrorRow errors={errors} reactKey={`wise_${wise.id}_errors`} />
    </React.Fragment>
  );
}

const Wises = ({ wises, actions, editMode, errors = {} }) => {
  let classes = ['wises-table'];
  if (editMode) {
    classes.push('editing');
  }

  let headers = ["Name"];
  if (!editMode) {
    headers = headers.concat(["Pass", "Fail", "Fate", "Pers."]);
  }

  return (
    <section>
      <h2>Wises</h2>
      <table className={classes.join(' ')}>
        <thead>
          <tr>
            {headers.map(h => <th key={`wh_${h}`}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {
            wises.map((w, i) => buildWise(w, i, actions, editMode, errors[i]))
          }
          {
            editMode ? (
              <tr><td>
                <button
                  onClick={() => actions.editCharacterAddField('wises')}
                  className="editable-property-name-button"
                >+</button>
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
