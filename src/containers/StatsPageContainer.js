import { connect } from 'react-redux';

import StatsPage from '../components/StatsPage';

const mapStateToProps = (state) => {
  // console.log(state);
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const StatsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsPage);

export default StatsPageContainer;
