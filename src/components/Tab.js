import React from 'react';
import PropTypes from 'prop-types';
import hamburger from '../images/hamburger_icon.png';

const Tab = ({ name, selected, onSelect }) => {
  let className = selected ? 'active' : 'inactive';
  let contents = name;

  if (name === 'MENU') {
    contents = (<img src={hamburger} alt="menu" />);
    className += " menu";
  }
  
  return (
    <li className={className} onClick={onSelect}>
      {contents}
    </li>
  );
}

export default Tab;
