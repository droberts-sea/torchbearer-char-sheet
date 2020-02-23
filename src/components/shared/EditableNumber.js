import React from 'react';

// import './styles/EditableNumber.css';

const EditableNumber = ({ value, editMode, onEdit, min=0, max=9, className, name, errors }) => {
  if (editMode) {
    className += ' editable-number'
    return (
      <div className={className}>
        <input
          className={"number" + (errors ? ' errors' : '')}
          type="number"
          name={name}
          value={value == undefined ? "" : value} // eslint-disable-line eqeqeq
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
    className += ' number'
    return (
      <span className={className} name={name}>{value}</span>
    );
  }
};

export default EditableNumber;