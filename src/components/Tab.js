import React from 'react';
import PropTypes from 'prop-types';

const Tab = ({ name, selected, onSelect }) => {
  const className = selected ? 'active' : 'inactive';
  return (
    <li className={className} onClick={onSelect}>
      {name}
    </li>
  );
}

export default Tab;
