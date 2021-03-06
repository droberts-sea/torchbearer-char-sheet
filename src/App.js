import React from 'react';
import { connect } from 'react-redux';
import { Tabs } from './actions';
import './App.css';

import TabRowContainer from './containers/TabRowContainer';
import BioPageContainer from './containers/BioPageContainer';
import StatsPageContainer from './containers/StatsPageContainer';
import InfoPageContainer from './containers/InfoPageContainer';
import RollPageContainer from './containers/RollPageContainer';
import MenuContainer from './containers/MenuContainer';
import BannerContainer from './containers/BannerContainer';

const mapStateToProps = (state) => {
  return {
    ui: state.ui
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

const App = ({ ui }) => {
  let page = null;
  switch (ui.currentTab) {
    case Tabs.BIO:
      page = (<BioPageContainer />);
      break;
      
    case Tabs.STATS:
      page = (<StatsPageContainer />);
      break;

    case Tabs.INFO:
      page = (<InfoPageContainer />);
      break;

    case Tabs.ROLL:
      page = (<RollPageContainer />);
      break;

    default:
      break;
  }

  return (
    <>
      <TabRowContainer />
      <MenuContainer />
      <BannerContainer />
      <main>
        {page}
      </main>
    </>
  );
};

// Is this bad? A little. This component is basically just
// a dispatcher, not complex enough to justify two files.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
