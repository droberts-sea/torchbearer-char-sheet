import React from 'react';

import PlusMinus from '../shared/PlusMinus';
import Toggle from '../shared/Toggle';

class AddDice extends React.Component {
  render() {
    console.log(this.props);
    return (
      <ul id="roll-add-dice">
        <Toggle
          name="Roll using Nature"
          subtext="If you don't have the skill, you can roll with (full) Nature instead of using Beginner's Luck. If the test is outside your Nature, your Nature will be taxed by the margin of failure."
          disabled={this.props.disabledOptions.natureInstead}
          active={this.props.modifiers.natureInstead}
          onToggle={(value) => this.props.onSetProperty('natureInstead', value)}
          />
        <Toggle
          name="Tap Nature"
          subtext="Spend a Persona to add your Nature to this test. If the test is outside your Nature, Nature will be taxed by one."
          disabled={this.props.disabledOptions.tapNature}
          active={this.props.modifiers.tapNature}
          onToggle={(value) => this.props.onSetProperty('tapNature', value)}
          />
        // Trait name
        // Trait checks
        <PlusMinus
          name="Help"
          subtext="Get help from your allies"
          value={this.props.modifiers.help}
          min={0}
          onValueChange={(help) => this.props.onSetProperty('help', help)}
          />
        <PlusMinus
          name="Persona Dice"
          subtext="Spend up to three Persona to gain extra dice on any roll"
          value={this.props.modifiers.personaDice}
          min={0}
          max={3}
          onValueChange={(personaDice) => this.props.onSetProperty('personaDice', personaDice)}
          />
      </ul>
    );
  }
}



export default AddDice;
