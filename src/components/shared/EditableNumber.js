import React from 'react';

// import './styles/EditableNumber.css';

const EditableNumber = ({ value, editMode, onEdit, min=0, max=9 }) => {
  if (editMode) {
    return (
      <div className="editable-number">
        <input
          className="number"
          type="number"
          value={value == undefined ? "" : value}
          onChange={(e) => {
            let value = parseInt(e.target.value);
            onEdit(isNaN(value) ? undefined : value);
          }}
          min={min}
          max={max}
        />
      </div>
    );
  } else {
    return (
      <span className="number">{value}</span>
    );
  }
};

export default EditableNumber;