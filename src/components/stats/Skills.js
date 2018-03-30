import React from 'react';
import SkillTable from './SkillTable';

class Skills extends SkillTable {
  extraCol(key, ability) {
    return (
      <td>
        {ability.beginnersLuck[0]}
      </td>
    );
  }

  tableHeaders() {
    const headers = super.tableHeaders();
    headers.push('BL');
    return headers;
  }

  render() {
    return (
      <section>
        <h2>Skills</h2>
        {this.table(this.props.skills)}
      </section>
    );
  }
}

export default Skills;
