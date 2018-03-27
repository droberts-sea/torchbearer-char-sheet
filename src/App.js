import React from 'react';
import './App.css';

import ConditionsTabContainer from './containers/ConditionsTabContainer';
import TabRowContainer from './containers/TabRowContainer';

const App = () => {
  // TODO: how to flip b/w tabs?
  return (
    <div>
      <TabRowContainer />
      <ConditionsTabContainer />
    </div>
  );
};

export default App;
