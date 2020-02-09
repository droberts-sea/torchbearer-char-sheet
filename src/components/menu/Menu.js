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
          <div className="menu-control">
            <h3>Export Character</h3>
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
          <div className="menu-control">
            <h3>Import Character</h3>
            <textarea
              rows="8"
              className="character-string"
              value={this.state.characterImportString}
              onChange={(e) => this.handleChange('characterImportString', e)}
            />
            <button onClick={() => {
              actions.importCharacter(JSON.parse(this.state.characterImportString))}
              }>
              Import Character
          </button>
          </div>
          <div className="menu-control">
            <button onClick={actions.resetCharacter}>Reset charater</button>
            <p>This cannot be undone! Mostly useful if you're a dev.</p>
          </div>

        </aside>
      </div>
    );
  }
}

export default Menu;