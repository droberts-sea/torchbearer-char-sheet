import { connect } from 'react-redux';
import { showTab } from '../actions';
import TabRow from '../components/TabRow';

const mapStateToProps = (state) => {
  console.log(state);
  return {
    currentTab: state.currentTab
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTabSelect: (name) => {
      dispatch(showTab(name));
    }
  }
};

const TabRowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabRow);

export default TabRowContainer;
