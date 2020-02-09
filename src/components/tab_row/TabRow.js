import React from 'react';

import { Tabs } from '../../actions';
import Tab from './Tab';

import '../../styles/tab_row.css';

const TabRow = ({ currentTab, showTab, menuOpen, toggleMenu }) => {
  return (
    <nav className="tab-row">
      <ul>
        <Tab
          key="tab_menu"
          name="MENU"
          selected={menuOpen}
          onSelect={toggleMenu}
        />
        {
          Object.keys(Tabs).map((name) => (
            <Tab
              key={`tab_${name}`}
              name={name}
              selected={name === currentTab}
              onSelect={() => showTab(name)}
            />
          ))
        }
      </ul>
    </nav>
  );
};

export default TabRow;
