import { connect } from 'react-redux';
import RollPage from '../components/roll/RollPage';

const mapStateToProps = (state) => {
  console.log(state);
  return {
    display: state.roll.display,
    dice: state.roll.dice
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

const RollPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RollPage);

export default RollPageContainer;
