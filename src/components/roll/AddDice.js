import React from 'react';

import Toggle from '../shared/Toggle';

class AddDice extends React.Component {
  render() {
    return (
      <ul id="roll-add-dice">
        <Toggle
          text="Roll using Nature instead"
          active={this.props.modifiers.natureInstead}
          />
      </ul>
    );
  }
}


// onToggle={(value) => this.props.onSetProperty(prop.name, value)}

export default AddDice;
