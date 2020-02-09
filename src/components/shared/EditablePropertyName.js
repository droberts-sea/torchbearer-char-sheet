import React from 'react';

import './styles/EditablePropertyName.css';

const EditablePropertyName = ({ name, editMode, onEdit, onRemove }) => {
  if (editMode) {
    return (
      <div className="editable-property-name">
        <button onClick={onRemove}>
          -
        </button>
        <input
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

export default EditablePropertyName;