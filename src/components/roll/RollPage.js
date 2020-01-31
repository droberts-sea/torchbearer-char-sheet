import React from 'react';
import PropTypes from 'prop-types';

import RollNav from './RollNav';
import RollSummary from './RollSummary';
import AddDice from './AddDice';
import GatherInfo from './GatherInfo';
import Ready from './Ready';
import Results from './Results';

import '../../styles/roll.css';
import './styles/RollPage.css';

class RollPage extends React.Component {
  currentAction() {
    switch(this.props.navStatus.pageName) {
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
          character={this.props.character}
          onSetProperty={this.props.onSetModifier}
          disabledOptions={this.props.disabledOptions.addDice}
          resourcesSpent={this.props.resourcesSpent}
          />
      );

      case 'READY':
      return (
        <Ready {...this.props} />
      );

      case 'REACT':
      return (
        <Results
          {...this.props.results}
          rollSummary={this.props.derived.summary}
          character={this.props.character}
          onSetReaction={this.props.onSetReaction}
          onAcceptRoll={this.props.operations.accept}
          disabledOptions={this.props.disabledOptions.results}
          resourcesSpent={this.props.resourcesSpent}
          />
      );
      
      // case 'OUTCOME':
      // return (
      //   <Aftermath {...this.props} />
      // );

      default:
      // throw new Error(`Invalid roll page ${this.props.display.currentPage}`);
      break;
    }
  }
  render() {
    const showSummary = [
      'GATHER INFO', 'ADD DICE', 'READY'
    ].includes(this.props.navStatus.pageName);

    return (
      <div id="roll-page">
        <RollNav
          status={this.props.navStatus}
          onGotoPage={this.props.onGotoPage}
          reset={this.props.operations.reset}
          />
        <div className="roll-page-action">
          { this.currentAction() }
        </div>
        {
          showSummary ? (
            <RollSummary {...this.props.derived.summary} />
          ) : ""
        }
      </div>
    );
  }
}

RollPage.propTypes = {
  // stage: PropTypes.string.isRequired,
  navStatus: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
  dice: PropTypes.object.isRequired,
  results: PropTypes.object.isRequired,
  derived: PropTypes.object.isRequired,
  disabledOptions: PropTypes.object.isRequired,
  resourcesSpent: PropTypes.object.isRequired,
  onGotoPage: PropTypes.func.isRequired,
  onSetInfo: PropTypes.func.isRequired,
  onSetModifier: PropTypes.func.isRequired,
  operations: PropTypes.object.isRequired,
  onSetReaction: PropTypes.func.isRequired,
};

export default RollPage;
