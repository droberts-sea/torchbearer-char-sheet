import React from 'react';
// import PropTypes from 'prop-types';

import './styles/Menu.css';
import Control from '../shared/Control';

const writeToClipboard = (content) => {
  navigator.clipboard.writeText(content).then(() => {
    // todo real feedback
    console.log('Wrote character to clipboard');
  }, () => {
    console.log('failed to write to clipboard');
  });
}

// This is a stateful component! Lots of little fiddly bits in the menu
// that need neither to be serialized nor accessed by the rest of the app.
// https://redux.js.org/faq/organizing-state#do-i-have-to-put-all-my-state-into-redux-should-i-ever-use-reacts-setstate
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characterImportString: '',
    };
  }

  handleChange = (propName, event) => {
    console.log("in handle change");
    console.log(this);

    this.setState({
      [propName]: event.target.value
    });
  }
  render() {
    const { open, character, actions } = this.props;

    console.log("Rendering menu " + open);
    let className = 'main-menu';
    if (!open) {
      className += " closed";
    }

    const characterString = JSON.stringify(character)


    return (
      <div className="main-menu-container">
        <aside className={className}>
          <h2>Menu</h2>
          {/* TODO: collapsable controls */}
          <ul>
            <Control
              name="Export Character"
              knob={(
                <div className="knob">
                  <textarea
                    readOnly={true}
                    rows="8"
                    className="character-string"
                    value={characterString}
                  />
                  <button onClick={() => writeToClipboard(characterString)}>
                    Copy to clipboard
                </button>
                </div>
              )}
            />
            <Control
              name="Import Character"
              knob={(
                <div className="knob">
                  <textarea
                    rows="8"
                    className="character-string"
                    value={this.state.characterImportString}
                    onChange={(e) => this.handleChange('characterImportString', e)}
                  />
                  <button onClick={() =>
                    actions.importCharacter(JSON.parse(this.state.characterImportString))
                  }>
                    Import Character
                </button>
                </div>
              )}
            />
            <Control
              name="Reset Character"
              knob={(
                <button onClick={actions.resetCharacter}>Reset charater</button>
              )}
              subtext="This cannot be undone! Mostly useful if you're a dev."
            />
          </ul>

        </aside>
      </div>
    );
  }
}

export default Menu;