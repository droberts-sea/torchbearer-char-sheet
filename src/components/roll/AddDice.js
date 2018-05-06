import React from 'react';

import Toggle from '../shared/Toggle';

class AddDice extends React.Component {
  render() {
    console.log(this.props);
    // TODO: onToggle - use the existing ROLL_SET_INFO action?
    // Do we need to split between info and modifiers? Don't like
    // parallel hash structure, but it might be the easiest thing to do.
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
      </ul>
    );
  }
}



export default AddDice;
