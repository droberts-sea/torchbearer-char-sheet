import React from 'react';
import img_x from '../../images/letter-x.png';

export default function Checkbox (props) {
  let className = "checkbox";
  if (props.disabled) {
    className += " disabled";
  }

  // If they didn't give us an onToggle, keep onClick undefined
  let onClick;
  if (props.onToggle) {
    onClick = () => {props.onToggle(!props.active)};
  }

  return (
    <div
      className={className}
      onClick={onClick}
      // TODO: Figure out how to do a background image in the CSS
      style={ props.active ? { backgroundImage: `url(${img_x})` } : undefined }
      />
  );
};
