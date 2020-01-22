import { connect } from 'react-redux';
import { toggleCondition, addPoint, spendPoint } from '../actions';
import InfoPage from '../components/info/InfoPage';

const mapStateToProps = (state) => {
  return {
    conditions: state.character.conditions,
    points: state.character.points
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetCondition: (name, isActive) => {
      dispatch(toggleCondition(name, isActive));
    },
    onPointAdd: (category) => {
      dispatch(addPoint(category));
    },
    onPointSpend: (category) => {
      dispatch(spendPoint(category));
    }
  }
};

const InfoPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoPage);

export default InfoPageContainer;
