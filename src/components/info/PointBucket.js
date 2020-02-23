import React from 'react';
import EditableNumber from '../shared/EditableNumber';
import ErrorList from '../shared/ErrorList';

const PointBucket = ({ name, bucket, editMode, onAdd, onSpend, onEdit, errors={} }) => {
  return (
    <section className="point-bucket">
      <h2>{name}</h2>
      <div className="point-bucket-grid">
        <button
          onClick={onAdd}
          disabled={editMode}
        >Earn</button>
        <label className="label" htmlFor="earned">Earned</label>
        <label className="label" htmlFor="spent">Spent</label>
        <button
          onClick={onSpend}
          disabled={editMode || bucket.available <= 0}
        >
          Spend
        </button>
        <EditableNumber
          value={bucket.available}
          editMode={editMode}
          onEdit={value => onEdit(value, 'available')}
          errors={errors.available}
          name="earned"
        />
        <EditableNumber
          value={bucket.spent}
          editMode={editMode}
          onEdit={value => onEdit(value, 'spent')}
          errors={errors.spent}
          name="spent"
        />
      </div>
      <ErrorList errors={errors} />
    </section>
  );
};

export default PointBucket;
