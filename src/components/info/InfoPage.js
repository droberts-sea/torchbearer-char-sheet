import React from 'react';
import Toggle from '../shared/Toggle';
import PointBucket from './PointBucket';
import { ConditionRules, DisplayOrder } from '../../rules/conditions';
import { PointCategories } from '../../actions';

import '../../styles/info.css';

class InfoPage extends React.Component {
  buildPointBucket(category) {
    return (
      <PointBucket
        name={category}
        bucket={this.props.points[category]}
        editMode={this.props.ui.editCharacter.editMode}
        onAdd={() => this.props.onPointAdd(category)}
        onSpend={() => this.props.onPointSpend(category)}
        onEdit={(value, bucket) => this.props.editCharacterProperty(value, 'points', category, bucket)}
        errors={this.props.errors.points[category]}
        />
    );
  };

  render() {
    return (
      <div id="info-page">
        {this.buildPointBucket(PointCategories.FATE)}
        {this.buildPointBucket(PointCategories.PERSONA)}
        {this.buildPointBucket(PointCategories.CHECKS)}
        <section className="conditions">
          <h2>Conditions</h2>
          <ul>
            {
              DisplayOrder.map((name) => {
                return (
                  <Toggle
                    key={`condition_${name}`}
                    {...ConditionRules[name]}
                    subtext={ConditionRules[name].effect}
                    active={this.props.conditions[name]}
                    onToggle={(newStatus) => this.props.onSetCondition(name, newStatus)}
                    />
                );
              })
            }
          </ul>
        </section>
      </div>
    );
  }
}

export default InfoPage;
