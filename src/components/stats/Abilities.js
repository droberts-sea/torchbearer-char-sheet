import React from 'react';
import SkillTable from './SkillTable';
import EditableNumber from '../shared/EditableNumber';

class Abilities extends SkillTable {
  natureDescriptors(nature) {
    const errors = this.props.errors.NATURE || {};
    let contents;
    if (this.props.editMode) {
      contents = (
        <div className="edit-nature-descriptors">
          {
            nature.descriptors.map((desc, i) => {
              let className = '';
              const errorField = `descriptor-${i}`;
              if (errors[errorField]) {
                className = 'errors'
              }
              return (
                <input key={`nd_${i}`}
                  className={className}
                  type="text"
                  value={desc}
                  onChange={(e =>
                    this.props.actions.editCharacterProperty(e.target.value, 'NATURE', 'descriptors', i)
                  )}
                />
              );
            })
          }
        </div>
      );

    } else {
      contents = nature.descriptors.join(', ');
    }

    return (
      <tr key="nature_descriptor">
        <td className="nature-descriptors" colSpan="4">
          {contents}
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
