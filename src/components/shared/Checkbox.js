import React from 'react';
import PropTypes from 'prop-types';

import img_x from '../../images/letter-x.png';
import './styles/Checkbox.css';

const Checkbox = function({active, disabled, onToggle}) {
  let className = "checkbox";
  if (disabled) {
    className += " disabled";
  }

  // If they didn't give us an onToggle, keep onClick undefined
  let onClick;
  if (onToggle && !disabled) {
    onClick = () => {onToggle(!active)};
  }

  return (
    <div
      className={className}
      onClick={onClick}
      // TODO: Figure out how to do a background image in the CSS
      style={ active ? { backgroundImage: `url(${img_x})` } : undefined }
      />
  );
};

Checkbox.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default Checkbox;
