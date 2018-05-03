import React from 'react';

import Toggle from '../shared/Toggle';

class AddDice extends React.Component {
  render() {
    console.log(this.props);
    // TODO: onToggle - use the existing ROLL_SET_PROPERTY action?
    // Do we need to split between info and modifiers? Don't like
    // parallel hash structure, but it might be the easiest thing to do.
    return (
      <ul id="roll-add-dice">
        <Toggle
          name="Roll using Nature"
          disabled={this.props.disabledOptions.natureInstead}
          active={this.props.modifiers.natureInstead}
          />
      </ul>
    );
  }
}


// onToggle={(value) => this.props.onSetProperty(prop.name, value)}

export default AddDice;
