import React from 'react';
// import PropTypes from 'prop-types';

import './styles/Menu.css';

const writeToClipboard = (content) => {
  navigator.clipboard.writeText(content).then(() => {
    // todo real feedback
    console.log('Wrote character to clipboard');
  }, () => {
    console.log('failed to write to clipboard');
  });
}

const Menu = ({ open, character }) => {
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
      </aside>
    </div>
  );
};

export default Menu;