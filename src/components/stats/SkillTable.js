import React from 'react';
import EditableNumber from '../shared/EditableNumber';

class SkillTable extends React.Component {
  advancement(name, skill) {
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
          <span className="number">{skill.advancement.pass}</span>
          <button onClick={() => this.props.actions.markTest(name, 'PASS')} disabled={disabled}>Mark</button>
        </td>
        <td className="advancement">
          <span className="number">{skill.advancement.fail}</span>
          <button onClick={() => this.props.actions.markTest(name, 'FAIL')} disabled={disabled}>Mark</button>
        </td>
      </React.Fragment>
    );
  }

  // Template methods
  rating(key, skill) { return skill.rating; }
  extraRow() { return null; }
  extraCol() { return null; }
  shouldShow() { return true; }
  onEdit() { }
  customRow() { return null; }

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
                onEdit={(value) => this.onSetProp('rating', value, key, skill)}
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
