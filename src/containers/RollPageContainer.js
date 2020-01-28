import { connect } from 'react-redux';
import {
  rollSetInfo,
  rollSetModifier,
  rollGotoPage
} from '../actions/roll_actions';
import RollPage from '../components/roll/RollPage';
import calculateDerivedRollState from '../derivers/roll/derived_state';

const mapStateToProps = (state) => {
  return {
    ...state.roll,
    character: state.character,
    derived: calculateDerivedRollState(state.roll, state.character)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGotoPage: (page) => {
      dispatch(rollGotoPage(page));
    },
    onSetInfo: (prop, value) => {
      dispatch(rollSetInfo(prop, value));
    },
    onSetModifier: (prop, value) => {
      dispatch(rollSetModifier(prop, value));
    }
  };
};

const RollPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RollPage);

export default RollPageContainer;
