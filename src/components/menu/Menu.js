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
    this.setState({
      [propName]: event.target.value
    });
  }

  render() {
    const { open, ui, character, actions } = this.props;

    let className = 'main-menu';
    if (!open) {
      className += " closed";
    }

    const characterString = JSON.stringify(character)

    let editKnob;

    if (ui.editCharacter.editMode) {
      editKnob = (
        <div className="knob">
          <button
            onClick={() => actions.editCharacterCommit(ui.editCharacter.character)}
          >Commit edits</button>
          <button onClick={actions.editCharacterRevert}>Revert edits</button>
        </div>
      );
    } else {
      editKnob = (
        <div className="knob">
          <button onClick={actions.editCharacterBegin}>Enter edit mode</button>
        </div>
      );
    }

    return (
      <div className="main-menu-container">
        <aside className={className}>
          <header className="main-menu-header">
            <h2>Menu</h2>
            <div className="main-menu-close"
              onClick={actions.toggleMenu}
            >←</div>
          </header>
          {/* TODO: collapsable controls */}
          <ul>
            <Control
              name="Edit Character"
              knob={editKnob}
              subtext="This lets you change things like the names and numbers of wises and traits, and the rating of skills and abilities. Normal controls are disabled while in edit mode. You'll need to come back here to either commit or revert your changes."
            />
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