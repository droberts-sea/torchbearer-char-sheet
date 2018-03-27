import React from 'react';
import PropTypes from 'prop-types';
import Condition from './Condition';
import { ConditionRules, DisplayOrder } from '../rules/conditions';

import '../styles/conditions.css';

const ConditionsTab = ({ conditions, onConditionToggle }) => {
  console.log(conditions);
  return (
    <div className="conditions-tab">
      <h2>Fate</h2>
      <h2>Persona</h2>
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
  );
};

export default ConditionsTab;
