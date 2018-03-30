import React from 'react';
import PropTypes from 'prop-types';
import Condition from './Condition';
import PointBucket from './PointBucket';
import { ConditionRules, DisplayOrder } from '../rules/conditions';
import { PointCategories } from '../actions';

import '../styles/info.css';

const buildPointBucket = (points, category, onPointAdd, onPointSpend) => {
  return (
    <PointBucket
      name={category}
      bucket={points[category]}
      onAdd={() => onPointAdd(category)}
      onSpend={() => onPointSpend(category)}
      />
  );
};

const InfoTab = ({ conditions, onConditionToggle, points, onPointAdd, onPointSpend }) => {
  return (
    <div className="info-tab">
      {buildPointBucket(points, PointCategories.FATE, onPointAdd, onPointSpend)}
      {buildPointBucket(points, PointCategories.PERSONA, onPointAdd, onPointSpend)}
      {buildPointBucket(points, PointCategories.CHECKS, onPointAdd, onPointSpend)}
      <div className="conditions">
        <h2>Conditions</h2>
        <ul>
          {
            DisplayOrder.map((name) => {
              return (
                <Condition
                  key={`condition_${name}`}
                  {...ConditionRules[name]}
                  active={conditions[name]}
                  onToggle={() => onConditionToggle(name)}
                  />
              );
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default InfoTab;
