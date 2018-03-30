import React from 'react';
import SkillTable from './SkillTable';

class Abilities extends SkillTable {
  rating(key, ability) {
    if (key === 'NATURE') {
      return `${ability.rating}/${ability.untaxed}`;
    }
    return super.rating(key, ability);
  }

  natureDescriptors(nature) {
    let text = nature.descriptors.join(', ');
    return (
      <tr key="nature_descriptor">
        <td className="nature-descriptors" colSpan="4">
          {text}
        </td>
      </tr>
    );
  }

  extraRow(key, ability) {
    if (key === 'NATURE') {
      return this.natureDescriptors(ability);
    }
    return null;
  }

  render() {
    return (
      <section>
        <h2>Abilities</h2>
        {this.table(this.props.abilities)}
      </section>
    );
  }
}

export default Abilities;
