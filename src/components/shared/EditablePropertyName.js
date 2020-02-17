import React from 'react';
import PropTypes from 'prop-types';

import './styles/EditablePropertyName.css';

const ErrorList = ({ errors }) => {
  console.log(errors);
  if (!errors) {
    return null;
  }

  return (
    <ul className="error-details">
      {errors.map(error => <li key={error}>{error}</li>)}
    </ul>
  )
}

const EditablePropertyName = ({ name, editMode, onEdit, onRemove, errors }) => {
  if (editMode) {
    return (
      <div className="editable-property-name">
        <div className="editable-property-name-row">
          <button
            className="editable-property-name-button"
            onClick={onRemove}
          >
            -
          </button>
          <input
            className={errors ? 'errors' : ''}
            type="text"
            value={name}
            onChange={(e) => onEdit(e.target.value)}
          />
        </div>
        <ErrorList errors={errors} />
      </div>
    );
  } else {
    return name;
  }
};

EditablePropertyName.propTypes = {
  name: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  errors: PropTypes.array,
}

export default EditablePropertyName;