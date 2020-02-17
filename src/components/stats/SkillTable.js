import React from 'react';
import EditableNumber from '../shared/EditableNumber';
import ErrorRow from '../shared/ErrorRow';

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

  advancement(key, skill, errors) {
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
            errors={errors.pass}
          />
          {this.advancementButton(key, 'pass', disabled)}
        </td>
        <td className="advancement">
          <EditableNumber
            value={skill.advancement.fail}
            editMode={this.props.editMode}
            onEdit={value => this.onSetProp(value, key, 'advancement', 'fail')}
            errors={errors.fail}
          />
          {this.advancementButton(key, 'fail', disabled)}
        </td>
      </React.Fragment>
    );
  }

  // Template methods
  extraRow() { return null; }
  extraCol() { return null; }
  shouldShow() { return true; }
  customRating() { return null; }

  onSetProp = (value, ...path) => {
    this.props.actions.editCharacterProperty(value, ...path);
  }

  tableBody(skills, category) {
    const allErrors = this.props.errors || {};
    return Object.keys(skills).map((key) => {
      const skill = skills[key];
      const errors = allErrors[key] || {};
      if (!this.shouldShow(key, skill)) {
        return null;
      }

      let rating = this.customRating(key, skill);
      if (!rating) {
        rating = (
          <EditableNumber
            value={skill.rating}
            editMode={this.props.editMode}
            onEdit={(value) => this.onSetProp(value, key, 'rating')}
            min={skill.min}
            max={skill.max}
            className="rating"
            errors={errors.rating}
          />
        )
      }

      return (
        <React.Fragment key={`${key}`}>
          <tr>
            <td>{skill.name}</td>
            <td>{rating}</td>
            {this.advancement(key, skill, errors)}
            {this.extraCol(key, skill)}
          </tr>
          {this.extraRow(key, skill)}
          <ErrorRow errors={errors} />
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
