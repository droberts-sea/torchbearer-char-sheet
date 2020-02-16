import React from 'react';

// import './styles/EditableNumber.css';

const EditableNumber = ({ value, editMode, onEdit, min=0, max=9 }) => {
  if (editMode) {
    return (
      <div className="editable-number">
        <input
          className="number"
          type="number"
          value={value}
          onChange={(e) => onEdit(e.target.value)}
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