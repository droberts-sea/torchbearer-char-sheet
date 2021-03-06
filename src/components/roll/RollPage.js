import React from 'react';
import PropTypes from 'prop-types';

import RollNav from './RollNav';
import RollSummary from './RollSummary';
import AddDice from './AddDice';
import GatherInfo from './GatherInfo';
import Ready from './Ready';
import Results from './Results';
import Outcome from './Outcome';

import '../../styles/roll.css';
import './styles/RollPage.css';

class RollPage extends React.Component {
  currentAction() {
    switch (this.props.navStatus.pageName) {
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
            resourcesSpent={this.props.impact.points.total}
          />
        );

      case 'READY':
        return (
          <Ready
            details={this.props.preRollDerived.details}
            rollDice={this.props.operations.rollDice}
          />
        );

      case 'REACT':
        return (
          <Results
            {...this.props.results}
            rollSummary={this.props.preRollDerived.summary}
            postRoll={this.props.postRollDerived}
            character={this.props.character}
            onSetReaction={this.props.onSetReaction}
            onAcceptRoll={() => this.props.operations.accept(this.props.impact)}
            disabledOptions={this.props.disabledOptions.results}
            resourcesSpent={this.props.impact.points.total}
          />
        );

      case 'OUTCOME':
        return (
          <Outcome
            outcome={this.props.outcome}
            impact={this.props.impact}
            postRoll={this.props.postRollDerived}
            impactApplied={this.props.impactApplied}
            character={this.props.character}
            onSetOutcome={this.props.onSetOutcome}
            onSetWiseAdvancement={this.props.onSetWiseAdvancement}
            operations={this.props.operations}
          />
        );

      default:
        throw new Error(`Invalid roll page ${this.props.display.currentPage}`);
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
          onResetRoll={this.props.operations.reset}
        />
        <div className="roll-page-action">
          {this.currentAction()}
        </div>
        {
          showSummary ? (
            <RollSummary {...this.props.preRollDerived.summary} />
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
  preRollDerived: PropTypes.object.isRequired,
  postRollDerived: PropTypes.object.isRequired,
  impact: PropTypes.object.isRequired,
  disabledOptions: PropTypes.object.isRequired,
  onGotoPage: PropTypes.func.isRequired,
  onSetInfo: PropTypes.func.isRequired,
  onSetModifier: PropTypes.func.isRequired,
  operations: PropTypes.object.isRequired,
  onSetReaction: PropTypes.func.isRequired,
  onSetOutcome: PropTypes.func.isRequired,
  onSetWiseAdvancement: PropTypes.func.isRequired,
};

export default RollPage;
