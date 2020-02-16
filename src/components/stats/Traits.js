import React from 'react';

import Checkbox from '../shared/Checkbox';
import EditableNumber from '../shared/EditableNumber';
import EditablePropertyName from '../shared/EditablePropertyName';

const UseCheckboxes = ({ trait, markTrait }) => {
  if (trait.level === 1 || trait.level === 2) {
    return (
      <React.Fragment>
        <Checkbox
          active={trait.uses >= 1}
          onToggle={(active) => markTrait(trait.name, active)}
        />
        <Checkbox
          disabled={trait.level < 2}
          active={trait.uses >= 2}
          onToggle={(active) => markTrait(trait.name, active)}
        />
      </React.Fragment>
    );
  } else {
    // If we've got a bogus trait level, just fake it.
    return (
      <div className="use-checkbox-standin">----</div>
    );
  }
};

class Traits extends React.Component {

  buildTrait(trait, index) {
    let uses = null;
    if (!this.props.editMode) {
      uses = (
        <td className="trait-uses">
          <UseCheckboxes trait={trait} markTrait={this.props.actions.markTrait} />
        </td>
      );
    }

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
          <EditableNumber
            value={trait.level}
            editMode={this.props.editMode}
            onEdit={(value) => this.props.actions.editCharacterProperty(value, 'traits', index, 'level')}
            min="1"
            max="3"
          />
        </td>
        {uses}
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
              {this.props.editMode ? "" : <th>Uses</th>}
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
