import React from 'react';
import SkillTable from './SkillTable';
import EditableNumber from '../shared/EditableNumber';

class Abilities extends SkillTable {
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

  customRating(key, ability) {
    if (key !== 'NATURE') {
      return null;
    }

    if (this.props.editMode) {
      return (
        <div className="edit-nature-rating">
          <EditableNumber
            value={ability.rating}
            editMode={this.props.editMode}
            onEdit={(value) => this.onSetProp(value, key, 'rating')}
            min={ability.min}
            max={ability.max}
          />
          /
        <EditableNumber
            value={ability.untaxed}
            editMode={this.props.editMode}
            onEdit={(value) => this.onSetProp(value, key, 'untaxed')}
            min={ability.min}
            max={ability.max}
          />
        </div>
      );
    } else {
      return (
        <span className="number rating">
          {ability.rating}/{ability.untaxed}
        </span>
      );
    }
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
