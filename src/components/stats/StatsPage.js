import React from 'react';
import Abilities from './Abilities';
import Wises from './Wises';
import Traits from './Traits';
import Skills from './Skills';

import '../../styles/stats.css';

class StatsPage extends React.Component {
  render() {
    return (
      <div id="stats-page">
        <Abilities
          abilities={this.props.abilities}
          onMarkTest={
            (name, mark) => this.props.onMarkTest(name, 'abilities', mark)
          }
          advancementDisabled={this.props.character.conditions.SICK}
          />
        <Wises
          wises={this.props.wises}
          onMarkTest={
            (name, mark, unmark) => this.props.onMarkTest(name, 'wises', mark, unmark)
          }
          />
        <Traits
          traits={this.props.traits}
          onMarkTrait={this.props.onMarkTrait}
          />
        <Skills
          skills={this.props.skills}
          onMarkTest={
            (name, mark) => this.props.onMarkTest(name, 'skills', mark)
          }
          isCollapsed={this.props.ui.skillTable.collapsed}
          onSkillCollapse={this.props.onSkillCollapse}
          advancementDisabled={this.props.character.conditions.SICK}
          />
      </div>
    );
  }
}

export default StatsPage;
