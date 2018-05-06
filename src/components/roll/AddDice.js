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
          disabled={this.props.disabledOptions.natureInstead}
          active={this.props.modifiers.natureInstead}
          onToggle={(value) => this.props.onSetProperty('natureInstead', value)}
          />
      </ul>
    );
  }
}



export default AddDice;
