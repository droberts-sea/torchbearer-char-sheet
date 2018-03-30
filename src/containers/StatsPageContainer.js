import { connect } from 'react-redux';

import StatsPage from '../components/stats/StatsPage';
import { markTest } from '../actions';

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    abilities: state.character.abilities
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMarkTest: (skillName, result) => {
      dispatch(markTest(skillName, result));
    }
  };
};

const StatsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsPage);

export default StatsPageContainer;
