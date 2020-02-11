import React from 'react';

import Checkbox from '../shared/Checkbox';
import EditablePropertyName from '../shared/EditablePropertyName';

class Traits extends React.Component {
  buildUseCheckboxes(trait) {
    if (trait.level < 1 || trait.level > 3) {
      throw new Error(`Bogus trait level ${trait.level}`);
    } else if (trait.level === 3) {
      return "----";
    } else {
      return (
        <React.Fragment>
          <Checkbox
            active={trait.uses >= 1}
            onToggle={(active) => this.props.actions.markTrait(trait.name, active)}
          />
          <Checkbox
            disabled={trait.level < 2}
            active={trait.uses >= 2}
            onToggle={(active) => this.props.actions.markTrait(trait.name, active)}
          />
        </React.Fragment>
      );
    }
  }

  buildTrait(trait, index) {
    return (
      <tr key={`trait_${trait.id}`}>
        <td>
          <EditablePropertyName
            name={trait.name}
            editMode={this.props.editMode}
            onEdit={(value) => this.props.actions.editCharacterProperty(value, 'traits', index, 'name')}
            onRemove={() => this.props.actions.editCharacterRemoveField('traits', index)}
          />
        </td>
        <td>
          {/* TODO editable */}
          <span className="number">{trait.level}</span>
        </td>
        <td className="trait-uses">
          {this.buildUseCheckboxes(trait)}
        </td>
      </tr>
    );
  }

  render() {
    return (
      <section>
        <h2>Traits</h2>
        <table className="traits-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Level</th>
              <th>Uses</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.traits.map(this.buildTrait.bind(this))
            }
            {
              this.props.editMode ? (
                <tr><td>
                  <button
                    onClick={() => this.props.actions.editCharacterAddField('traits')}
                    className="editable-property-name-button"
                  >+</button>
                </td></tr>
              ) : null
            }
          </tbody>
        </table>

      </section>
    );
  }
}

export default Traits;
