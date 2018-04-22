import { connect } from 'react-redux';
import {
  rollSetProperty
} from '../actions/roll_actions';
import RollPage from '../components/roll/RollPage';

const mapStateToProps = (state) => {
  return {
    display: state.roll.display,
    dice: state.roll.dice,
    character: state.character
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    gatherInfoCallbacks: {
      onSetProperty: (prop, value) => {
        dispatch(rollSetProperty(prop, value));
      }
    }
  };
};

const RollPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RollPage);

export default RollPageContainer;