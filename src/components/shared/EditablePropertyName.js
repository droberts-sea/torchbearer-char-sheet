import React from 'react';
import PropTypes from 'prop-types';

import './styles/EditablePropertyName.css';

const EditablePropertyName = ({ name, editMode, onEdit, onRemove, errors }) => {
  if (editMode) {
    return (
      <div className="editable-property-name">
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