import React from 'react';
import Abilities from './Abilities';

import '../../styles/stats.css';

class StatsPage extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div id="stats-page">
        <Abilities
          abilities={this.props.abilities}
          />
        <section>
          <h2>Wises</h2>
        </section>
        <section>
          <h2>Skills</h2>
        </section>
        <section>
          <h2>Traits</h2>
        </section>
      </div>
    );
  }
}

export default StatsPage;
