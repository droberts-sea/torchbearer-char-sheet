import { connect } from 'react-redux';
import { showTab, toggleMenu } from '../actions';
import TabRow from '../components/tab_row/TabRow';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return {
    currentTab: state.ui.currentTab,
    menuOpen: state.ui.menu.open,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ showTab, toggleMenu }, dispatch);
};

const TabRowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabRow);

export default TabRowContainer;
