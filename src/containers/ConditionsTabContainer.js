import { connect } from 'react-redux';
import { toggleCondition, addPoint, spendPoint } from '../actions';
import InfoTab from '../components/InfoTab';

const mapStateToProps = (state) => {
  return {
    conditions: state.character.conditions,
    points: state.character.points
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onConditionToggle: (name) => {
      dispatch(toggleCondition(name));
    },
    onPointAdd: (category) => {
      dispatch(addPoint(category));
    },
    onPointSpend: (category) => {
      dispatch(spendPoint(category));
    }
  }
};

const InfoTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoTab);

export default InfoTabContainer;
