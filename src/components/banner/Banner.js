import React from 'react';
import PropTypes from 'prop-types';

import './styles/Banner.css';

const Banner = ({ ui, roll }) => {
  let bannerText;
  if (ui.editCharacter.editMode) {
    bannerText = "You are in edit mode! Return to the main menu to finish."

    // TODO: when there are act buttons, pay attention to them.
  } else if (roll.pageIndex !== 0) {
    // bannerText = "Roll in progress, try "
  }

  let className = 'banner';
  if (!bannerText) {
    className += 'collapsed';
  }
  return (
    <h3 className={className}>{bannerText}</h3>
  );
};

Banner.propTypes = {
  ui: PropTypes.object.isRequired,
  roll: PropTypes.object.isRequired,
}

export default Banner;