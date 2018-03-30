import React from 'react';

class Abilities extends React.Component {
  advancementRows(ability) {
    if (!ability.advancement) {
      return null;
    }
    return (
      <React.Fragment>
        <td className="advancement">
          <span className="number">{ability.advancement.pass}</span>
          <button onClick={() => this.props.onAdvance('PASS')}>Mark</button>
        </td>
        <td className="advancement">
          <span className="number">{ability.advancement.fail}</span>
          <button onClick={() => this.props.onAdvance('FAIL')}>Mark</button>
        </td>
      </React.Fragment>
    );
  }
  tableBody() {
    const abilities = this.props.abilities;
    return Object.keys(abilities).map((key) => {
      return (
        <tr key={`ability_${key}`}>
          <td>{abilities[key].name}</td>
          <td>
            <span className="number">{abilities[key].rating}</span>
          </td>
          {this.advancementRows(abilities[key])}
        </tr>
      );
    });
  }
  render() {
    return (
      <section>
        <h2>Abilities</h2>
        <table className="skill-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Passes</th>
              <th>Fails</th>
            </tr>
          </thead>
          <tbody>
            {this.tableBody()}
          </tbody>
        </table>
      </section>
    );
  };
}

export default Abilities;
