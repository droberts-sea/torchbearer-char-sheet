import React from 'react';
import img_x from '../../images/letter-x.png';

export default function Checkbox (props) {
  return (
    <div
      className="checkbox"
      onClick={props.onToggle}
      style={ props.active ? { backgroundImage: `url(${img_x})` } : undefined }
      />
  );
}
