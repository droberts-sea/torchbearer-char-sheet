import React from 'react';
import EditableNumber from '../shared/EditableNumber';

class SkillTable extends React.Component {
  advancementButton(name, mark, disabled) {
    if (this.props.editMode) {
      return null;
    }
    return (
      <button
        onClick={() => this.props.actions.markTest(name, mark)}
        disabled={disabled}
      >Mark</button>
    );
  }

  advancement(key, skill) {
    if (!skill.advancement) {
      return null;
    }
    const disabled = (
      this.props.advancementDisabled ||
      skill.rating >= skill.max
    );
    return (
      <React.Fragment>
        <td className="advancement">
          <EditableNumber
            value={skill.advancement.pass}
            editMode={this.props.editMode}
            onEdit={value => this.onSetProp(value, key, 'advancement', 'pass')}
          />
          {this.advancementButton(key, 'pass', disabled)}
        </td>
        <td className="advancement">
          <EditableNumber
            value={skill.advancement.fail}
            editMode={this.props.editMode}
            onEdit={value => this.onSetProp(value, key, 'advancement', 'fail')}
          />
          {this.advancementButton(key, 'fail', disabled)}
        </td>
      </React.Fragment>
    );
  }

  // Template methods
  rating(key, skill) { return skill.rating; }
  extraRow() { return null; }
  extraCol() { return null; }
  shouldShow() { return true; }
  customRow() { return null; }

  onSetProp = (value, ...path) => {
    this.props.actions.editCharacterProperty(value, ...path);
  }

  tableBody(skills, category) {
    return Object.keys(skills).map((key) => {
      const skill = skills[key];
      if (!this.shouldShow(key, skill)) {
        return null;
      }

      const customRow = this.customRow(key, skill)
      if (customRow) {
        return customRow;
      }

      return (
        <React.Fragment key={`${key}`}>
          <tr>
            <td>{skill.name}</td>
            <td>
              <EditableNumber
                value={this.rating(key, skill)}
                editMode={this.props.editMode}
                onEdit={(value) => this.onSetProp(value, key, 'rating')}
                min={skill.min}
                max={skill.max}
                className="rating"
              />
            </td>
            {this.advancement(key, skill)}
            {this.extraCol(key, skill)}
          </tr>
          {this.extraRow(key, skill)}
        </React.Fragment>
      );
    });
  }

  tableHeaders() {
    return ['Name', 'Rating', 'Passes', 'Fails'];
  }

  table(skills) {
    const headers = this.tableHeaders().map((name) => (
      <th key={`header_${name}`}>{name}</th>
    ));

    return (
      <table className="skill-table">
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>
          {this.tableBody(skills)}
        </tbody>
      </table>
    );
  };
}

export default SkillTable;
