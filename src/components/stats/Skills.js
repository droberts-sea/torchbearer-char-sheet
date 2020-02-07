import React from 'react';
import SkillTable from './SkillTable';

// XXX this is an antipattern, react specifically recommends against extending your own components
// see https://reactjs.org/docs/composition-vs-inheritance.html
class Skills extends SkillTable {
  extraCol(key, ability) {
    return (
      <td className="beginners-luck">
        {ability.beginnersLuck[0]}
      </td>
    );
  }

  tableHeaders() {
    const headers = super.tableHeaders();
    headers.push('BL');
    return headers;
  }

  shouldShow(key, skill) {
    if (!this.props.isCollapsed) {
      return true;
    }
    return skill.rating > 0 || skill.advancement.pass > 0 || skill.advancement.fail > 0;
  }

  render() {
    return (
      <section>
        <h2>Skills</h2>
        <button onClick={this.props.onSkillCollapse}>
          {this.props.isCollapsed ? "Expand" : "Collapse"}
        </button>
        {this.table(this.props.skills)}
      </section>
    );
  }
}

export default Skills;
