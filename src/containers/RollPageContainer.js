import { connect } from 'react-redux';
import { rollSetVersus, rollSetOb, rollSetSkill } from '../actions';
import RollPage from '../components/roll/RollPage';

const mapStateToProps = (state) => {
  console.log(state);
  return {
    display: state.roll.display,
    dice: state.roll.dice,
    character: state.character
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    gatherInfoCallbacks: {
      onSetVersus: (isVersus) => {
        dispatch(rollSetVersus(isVersus));
      },
      onSetOb: (ob) => {
        dispatch(rollSetOb(ob));
      },
      onSelectSkill: (skill) => {
        dispatch(rollSetSkill(skill));
      }
    }
  };
};

const RollPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RollPage);

export default RollPageContainer;
