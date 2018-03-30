import React from 'react';
import PropTypes from 'prop-types';

const PointBucket = ({ name, bucket, onAdd, onSpend }) => {
  return (
    <div className="point-bucket">
      <h2>{name}</h2>
      <div className="point-bucket-grid">
        <button onClick={onAdd}>Earn</button>
        <label>Earned</label>
        <label>Spent</label>
        <button
          onClick={onSpend}
          disabled={bucket.available <= 0}
          >
          Spend
        </button>
        <span className="point-value">{bucket.available}</span>
        <span className="point-value">{bucket.spent}</span>
      </div>
    </div>
  );
};

export default PointBucket;
