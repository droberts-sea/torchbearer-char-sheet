import React from 'react';
import PropTypes from 'prop-types';

const PointBucket = ({ name, bucket, onAdd, onSpend }) => {
  return (
    <section className="point-bucket">
      <h2>{name}</h2>
      <div className="point-bucket-grid">
        <button onClick={onAdd}>Earn</button>
        <label for="earned">Earned</label>
        <label for="spent">Spent</label>
        <button
          onClick={onSpend}
          disabled={bucket.available <= 0}
          >
          Spend
        </button>
        <span className="number" name="earned">{bucket.available}</span>
        <span className="number" name="spent">{bucket.spent}</span>
      </div>
    </section>
  );
};

export default PointBucket;
