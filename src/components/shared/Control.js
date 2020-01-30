import React from 'react';
import PropTypes from 'prop-types';

import './styles/Control.css';

const Control = ({name, subtext, knob, className}) => {
  className += ' control';
  return (
    <li className={className}>
      <div className="control-main">
        <h3 className="control-title">{ name }</h3>
        {knob}
      </div>
      { subtext ? (<p>{ subtext }</p>) : "" }
    </li>
  );
}

Control.propTypes = {
  name: PropTypes.string.isRequired,
  subtext: PropTypes.node,
  knob: PropTypes.node,
  className: PropTypes.string,
}

Control.defaultProps = {
  className: ''
}

export default Control;
