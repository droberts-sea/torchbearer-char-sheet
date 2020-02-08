import React from 'react';

import Checkbox from '../shared/Checkbox';

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
            onToggle={(active) => this.props.onMarkTrait(trait.name, active)}
            />
          <Checkbox
            disabled={trait.level < 2}
            active={trait.uses >= 2}
            onToggle={(active) => this.props.onMarkTrait(trait.name, active)}
            />
        </React.Fragment>
      );
    }
  }

  buildTrait(trait, i) {
    return (
      <tr key={`trait_${i}`}>
        <td>{ trait.name }</td>
        <td>
          <span className="number">{trait.level}</span>
        </td>
        <td className="trait-uses">
          { this.buildUseCheckboxes(trait) }
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
          </tbody>
        </table>

      </section>
    );
  }
}

export default Traits;
