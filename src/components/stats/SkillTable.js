import React from 'react';

class SkillTable extends React.Component {
  advancement(key, ability) {
    if (!ability.advancement) {
      return null;
    }
    const disabled = (
      this.props.advancementDisabled ||
      ability.rating >= ability.max
    );
    return (
      <React.Fragment>
        <td className="advancement">
          <span className="number">{ability.advancement.pass}</span>
          <button onClick={() => this.props.onMarkTest(key, 'PASS')} disabled={disabled}>Mark</button>
        </td>
        <td className="advancement">
          <span className="number">{ability.advancement.fail}</span>
          <button onClick={() => this.props.onMarkTest(key, 'FAIL')} disabled={disabled}>Mark</button>
        </td>
      </React.Fragment>
    );
  }

  // Template methods
  rating(key, ability) { return ability.rating; }
  extraRow() { return null; }
  extraCol() { return null; }
  shouldShow() { return true; }

  tableBody(skills) {
    return Object.keys(skills).map((key) => {
      if (!this.shouldShow(key, skills[key])) {
        return null;
      }
      return (
        <React.Fragment key={`${key}`}>
          <tr>
            <td>{skills[key].name}</td>
            <td>
              <span className="number rating">
                {this.rating(key, skills[key])}
              </span>
            </td>
            {this.advancement(key, skills[key])}
            {this.extraCol(key, skills[key])}
          </tr>
          {this.extraRow(key, skills[key])}
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
