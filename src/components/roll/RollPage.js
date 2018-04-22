import React from 'react';

import RollNav from './RollNav';
import RollSummary from './RollSummary';
import GatherInfo from './GatherInfo';

import '../../styles/roll.css';

class RollPage extends React.Component {
  currentAction() {
    switch(this.props.display.currentPage) {
      case 'GATHER INFO':
      return (
        <GatherInfo {...this.props} />
      );

      // case 'ADD DICE':
      // return (
      //   <AddDice ...this.props />
      // );
      //
      // case 'READY':
      // return (
      //   <Ready ...this.props />
      // );
      //
      // case 'RESULTS':
      // return (
      //   <Results ...this.props />
      // );
      //
      // case 'AFTERMATH':
      // return (
      //   <Aftermath ...this.props />
      // );
    }
  }
  render() {
    return (
      <div id="roll-page">
        <RollNav {...this.props.display} />
        { this.currentAction() }
        <RollSummary {...this.props.display.summary} />
      </div>
    );
  }
}

export default RollPage;
