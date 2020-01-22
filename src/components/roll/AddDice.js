import React from 'react';
import PropTypes from 'prop-types';

import PlusMinus from '../shared/PlusMinus';
import Toggle from '../shared/Toggle';
import TraitDropdown from './TraitDropdown';

import './styles/AddDice.css';

class AddDice extends React.Component {
  render() {
    let blHeaderStyle = "";
    if (this.props.disabledOptions.natureInstead) {
      blHeaderStyle = "hidden";
    } else if (this.props.disabledOptions.beginnersLuckHeaders) {
      blHeaderStyle = "struck";
    }
    return (
      <ul id="roll-add-dice">
        {
          // TODO only display beginner's luck info and "roll using nature" if character does not have this skill
        }
        <Toggle
          name="Roll using Nature"
          subtext="If you don't have the skill, you can roll with (full) Nature instead of using Beginner's Luck. If the test is outside your Nature, your Nature will be taxed by the margin of failure. If you are Afraid, this option will be selected automatically."
          disabled={this.props.disabledOptions.natureInstead || this.props.disabledOptions.unselectNatureInstead}
          active={this.props.modifiers.natureInstead}
          onToggle={(value) => this.props.onSetProperty('natureInstead', value)}
          className={
            this.props.disabledOptions.natureInstead ? "hidden" : ""
          }
        />
        <li className={blHeaderStyle}>
          <h2>Before Beginner&apos;s Luck</h2>
        </li>
        <PlusMinus
          name="Help"
          subtext="Get help from your allies, through wises or an appropriate skill"
          value={this.props.modifiers.help}
          min={0}
          onValueChange={(help) => this.props.onSetProperty('help', help)}
        />
        <Toggle
          name="Supplies"
          active={this.props.modifiers.supplies}
          onToggle={(value) => this.props.onSetProperty('supplies', value)}
        />
        <Toggle
          name="Gear"
          active={this.props.modifiers.gear}
          onToggle={(value) => this.props.onSetProperty('gear', value)}
        />
        <li className={blHeaderStyle}>
          <h2>After Beginner&apos;s Luck</h2>
        </li>
        <TraitDropdown
          traitName={this.props.modifiers.traitName}
          traitEffect={this.props.modifiers.traitEffect}
          characterTraits={this.props.character.traits}
          disabledOptions={this.props.disabledOptions}
          onSetProperty={this.props.onSetProperty}
        />
        <PlusMinus
          name="Persona Dice"
          subtext="Spend up to three Persona to gain extra dice on any roll"
          value={this.props.modifiers.personaDice}
          min={0}
          max={3}
          onValueChange={(personaDice) => this.props.onSetProperty('personaDice', personaDice)}
        />
        <Toggle
          name="Tap Nature"
          subtext="Spend a Persona to add your Nature to this test. If the test is outside your Nature, Nature will be taxed by one."
          disabled={this.props.disabledOptions.tapNature}
          active={this.props.modifiers.tapNature}
          onToggle={(value) => this.props.onSetProperty('tapNature', value)}
        />
        {
          // TODO: indicator for fresh (non-interactive)
        }
      </ul>
    );
  }
}

AddDice.propTypes = {
  disabledOptions: PropTypes.object.isRequired,
  onSetProperty: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired,
  modifiers: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
};

export default AddDice;
