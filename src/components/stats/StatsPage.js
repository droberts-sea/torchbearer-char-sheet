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
          actions={{
            ...this.props.actions,
            editCharacterProperty: (value, ...path) => this.props.actions.editCharacterProperty(value, 'abilities', ...path),
            markTest: (name, mark) => this.props.actions.markTest(name, 'abilities', mark)
          }}
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
          errors={this.props.errors.wises}
          />
        <Traits
          traits={this.props.traits}
          actions={this.props.actions}
          editMode={editMode}
          />
        <Skills
          skills={this.props.skills}
          actions={{
            ...this.props.actions,
            editCharacterProperty: (value, ...path) => this.props.actions.editCharacterProperty(value, 'skills', ...path),
            markTest: (name, mark) => this.props.actions.markTest(name, 'skills', mark),
          }}
          display={this.props.ui.skillTable.display}
          onSkillCollapse={this.props.actions.skillCollapse}
          advancementDisabled={this.props.character.conditions.SICK}
          editMode={editMode}
          />
      </div>
    );
  }
};

StatsPage.defaultProps = {
  errors: {},
}

export default StatsPage;
