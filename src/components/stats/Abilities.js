import React from 'react';

class Abilities extends React.Component {
  passesAndFails(key, ability) {
    if (!ability.advancement) {
      return null;
    }
    return (
      <React.Fragment>
        <td className="advancement">
          <span className="number">{ability.advancement.pass}</span>
          <button onClick={() => this.props.onMarkTest(key, 'PASS')}>Mark</button>
        </td>
        <td className="advancement">
          <span className="number">{ability.advancement.fail}</span>
          <button onClick={() => this.props.onMarkTest(key, 'FAIL')}>Mark</button>
        </td>
      </React.Fragment>
    );
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

  rating(key, ability) {
    let value;
    if (key === 'NATURE') {
      value = `${ability.rating}/${ability.untaxed}`;
    } else {
      value = ability.rating;
    }
    return (<span className="number rating">{value}</span>);
  }

  tableBody() {
    const abilities = this.props.abilities;
    return Object.keys(abilities).map((key) => {
      let extraRow = null;
      if (key === 'NATURE') {
        extraRow = this.natureDescriptors(abilities[key]);
      }
      return (
        <React.Fragment key={`ability_${key}`}>
          <tr>
            <td>{abilities[key].name}</td>
            <td>
              {this.rating(key, abilities[key])}
            </td>
            {this.passesAndFails(key, abilities[key])}
          </tr>
          {extraRow}
        </React.Fragment>
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
