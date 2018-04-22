import { connect } from 'react-redux';
import {
  rollSetProperty,
  rollGotoPage
} from '../actions/roll_actions';
import RollPage from '../components/roll/RollPage';

const mapStateToProps = (state) => {
  return {
    ...state.roll,
    character: state.character
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGotoPage: (page) => {
      dispatch(rollGotoPage(page));
    },
    onSetProperty: (prop, value) => {
      dispatch(rollSetProperty(prop, value));
    }
  };
};

const RollPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RollPage);

export default RollPageContainer;
