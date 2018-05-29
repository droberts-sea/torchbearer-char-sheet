import React from 'react';
import PropTypes from 'prop-types';

import './styles/Control.css';

const Control = ({name, subtext, knob, className}) => {
  className += ' control';
  return (
    <li className={className}>
      <div>
        <h3>{ name }</h3>
        {knob}
      </div>
      { subtext ? (<p>{ subtext }</p>) : "" }
    </li>
  );
}

Control.propTypes = {
  name: PropTypes.string.isRequired,
  subtext: PropTypes.string,
  knob: PropTypes.node,
  className: PropTypes.string,
}

Control.defaultProps = {
  className: ''
}

export default Control;
