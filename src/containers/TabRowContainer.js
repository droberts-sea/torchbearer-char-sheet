import { connect } from 'react-redux';
import { showTab } from '../actions';
import TabRow from '../components/tab_row/TabRow';

const mapStateToProps = (state) => {
  return {
    currentTab: state.ui.currentTab
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTabSelect: (name) => {
      dispatch(showTab(name));
    }
  };
};

const TabRowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabRow);

export default TabRowContainer;
