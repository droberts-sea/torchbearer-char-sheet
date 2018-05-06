import React from 'react';

import RollNav from './RollNav';
import RollSummary from './RollSummary';
import AddDice from './AddDice';
import GatherInfo from './GatherInfo';
import Ready from './Ready';

import '../../styles/roll.css';

class RollPage extends React.Component {
  currentAction() {
    switch(this.props.display.currentPage) {
      case 'GATHER INFO':
      return (
        <GatherInfo {...this.props.dice}
          onSetProperty={this.props.onSetInfo}
          character={this.props.character} />
      );

      case 'ADD DICE':
      return (
        <AddDice
          {...this.props.dice}
          onSetProperty={this.props.onSetModifier}
          disabledOptions={this.props.derived.disabledOptions} />
      );

      case 'READY':
      return (
        <Ready {...this.props} />
      );

      // case 'RESULTS':
      // return (
      //   <Results {...this.props} />
      // );
      //
      // case 'AFTERMATH':
      // return (
      //   <Aftermath {...this.props} />
      // );

      default:
      // throw new Error(`Invalid roll page ${this.props.display.currentPage}`);
      break;
    }
  }
  render() {
    return (
      <div id="roll-page">
        <RollNav
          {...this.props.display}
          onGotoPage={this.props.onGotoPage}
          />
        <div className="roll-page-container">
          { this.currentAction() }
        </div>
        <RollSummary {...this.props.derived.summary} />
      </div>
    );
  }
}

export default RollPage;
