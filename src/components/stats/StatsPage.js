import React from 'react';
import Abilities from './Abilities';
import Wises from './Wises';
import Traits from './Traits';
import Skills from './Skills';

import '../../styles/stats.css';

class StatsPage extends React.Component {
  render() {
    const editMode = this.props.ui.editCharacter.editMode;
    return (
      <div id="stats-page">
        <Abilities
          abilities={this.props.abilities}
          onMarkTest={
            (name, mark) => this.props.actions.markTest(name, 'abilities', mark)
          }
          advancementDisabled={this.props.character.conditions.SICK}
          editMode={editMode}
          />
        <Wises
          wises={this.props.wises}
          actions={{
            ...this.props.actions,
            markTest: (name, mark, unmark) => this.props.actions.markTest(name, 'wises', mark, unmark)
          }}
          editMode={editMode}
          />
        <Traits
          traits={this.props.traits}
          actions={this.props.actions}
          editMode={editMode}
          />
        <Skills
          skills={this.props.skills}
          onMarkTest={
            (name, mark) => this.props.actions.markTest(name, 'skills', mark)
          }
          isCollapsed={this.props.ui.skillTable.collapsed}
          onSkillCollapse={this.props.actions.skillCollapse}
          advancementDisabled={this.props.character.conditions.SICK}
          editMode={editMode}
          />
      </div>
    );
  }
}

export default StatsPage;
