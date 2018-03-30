import React from 'react';

class Abilities extends React.Component {
  advancementRows(ability) {
    if (!ability.advancement) {
      return null;
    }
    return (
      <React.Fragment>
        <div>
          <span className="number">{ability.advancement.pass}</span>
          <button onClick={() => this.props.onAdvance('PASS')}>Mark</button>
        </div>
        <div>
          <span className="number">{ability.advancement.fail}</span>
          <button onClick={() => this.props.onAdvance('FAIL')}>Mark</button>
        </div>
      </React.Fragment>
    );
  }
  tableBody() {
    const abilities = this.props.abilities;
    return Object.keys(abilities).map((key) => {
      return (
        <React.Fragment>
          <div className="skill-name">{abilities[key].name}</div>
          <div className="number">{abilities[key].rating}</div>
          {this.advancementRows(abilities[key])}
        </React.Fragment>
      );
    });
  }
  render() {
    return (
      <section>
        <h2>Abilities</h2>
        <div className="skill-table">
          <div className="skill-name header">Name</div>
          <div className="header">Rating</div>
          <div className="header">Passes</div>
          <div className="header">Fails</div>
          {this.tableBody()}
        </div>
      </section>
    );
  };
}

export default Abilities;
