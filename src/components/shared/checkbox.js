import React from 'react';
import img_x from '../../images/letter-x.png';

export default function Checkbox (props) {
  let className = "checkbox";
  if (props.disabled) {
    className += " disabled";
  }
  return (
    <div
      className={className}
      onClick={props.onToggle}
      // TODO: Figure out how to do a background image in the CSS
      style={ props.active ? { backgroundImage: `url(${img_x})` } : undefined }
      />
  );
};
