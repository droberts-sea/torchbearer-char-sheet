import React from 'react';
import Abilities from './Abilities';
import Skills from './Skills';

import '../../styles/stats.css';

class StatsPage extends React.Component {
  render() {
    return (
      <div id="stats-page">
        <Abilities
          abilities={this.props.abilities}
          onMarkTest={this.props.onMarkTest}
          />
        <section>
          <h2>Wises</h2>
        </section>
        <Skills
          skills={this.props.skills}
          onMarkTest={this.props.onMarkTest}
          />
        <section>
          <h2>Traits</h2>
        </section>
      </div>
    );
  }
}

export default StatsPage;
