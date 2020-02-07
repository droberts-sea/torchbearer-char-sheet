import React from 'react';
import PropTypes from 'prop-types';

import './styles/OutcomeSummary.css';

const OutcomeSummary = ({ postRoll }) => {
  const { outcome, ob, totalSuccesses } = postRoll;
  return (
    <div className="outcome-summary">
      <h2>Outcome: {outcome}</h2>

      <div className="outcome-stats">
        <label htmlFor="ob">
          Obstacle
        </label>
        <label htmlFor="successes">
          Successes
        </label>
        <label htmlFor="margin">
          Margin
        </label>
        <span className="number" name="ob">
          {ob}
        </span>
        <span className="number" name="successes">
          {totalSuccesses}
        </span>
        <span className="number" name="margin">
          {totalSuccesses - ob}
        </span>
      </div>
    </div>
  );
};

OutcomeSummary.propTypes = {
  postRoll: PropTypes.shape({
    outcome: PropTypes.string.isRequired,
    ob: PropTypes.number.isRequired,
    totalSuccesses: PropTypes.number.isRequired,
  }).isRequired,
}

export default OutcomeSummary;