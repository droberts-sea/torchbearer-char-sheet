import { connect } from 'react-redux';

import StatsPage from '../components/stats/StatsPage';

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    abilities: state.character.abilities
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
