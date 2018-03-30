import React from 'react';
import PropTypes from 'prop-types';

import { Tabs } from '../../actions';
import Tab from './Tab';

import '../../styles/tab_row.css';

const TabRow = ({ currentTab, onTabSelect }) => {
  return (
    <nav className="tab-row">
      <ul>
        {
          Object.keys(Tabs).map((name) => (
            <Tab
              key={`tab_${name}`}
              name={name}
              selected={name === currentTab}
              onSelect={() => onTabSelect(name)}
              />
          ))
        }
      </ul>
    </nav>
  );
};

export default TabRow;
