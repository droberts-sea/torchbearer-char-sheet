import React from 'react';
import SkillTable from './SkillTable';
import { SKILL_DISPLAY_OPTIONS } from '../../actions';
import { SkillRules } from '../../rules/skills';

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
    const isOpen = skill.open || skill.rating > 0 || skill.advancement.pass > 0 || skill.advancement.fail > 0;

    switch (this.props.display) {
      case SKILL_DISPLAY_OPTIONS.OPEN:
        return isOpen;

      case SKILL_DISPLAY_OPTIONS.CORE:
        const rule = SkillRules[skill.internalName];
        return isOpen || (rule && rule.isCore);

      case SKILL_DISPLAY_OPTIONS.ALL:
      default:
        return true;
    }
  }

  onSetProp = (prop, value, key, skill) => {
    this.props.actions.editCharacterProperty(value, 'skills', key, prop);
  }

  sdButton = (text, option) => {
    return (
      <button
        disabled={this.props.display === option}
        onClick={() => this.props.actions.setSkillDisplay(option)}>
        {text}
      </button>
    );
  }

  render() {
    return (
      <section>
        <h2>Skills</h2>
        <div className="skill-display-buttons">
          {this.sdButton('Open only', SKILL_DISPLAY_OPTIONS.OPEN)}
          {this.sdButton('Open + core', SKILL_DISPLAY_OPTIONS.CORE)}
          {this.sdButton('All skills', SKILL_DISPLAY_OPTIONS.ALL)}
        </div>
        {this.table(this.props.skills)}
      </section>
    );
  }
}

export default Skills;
