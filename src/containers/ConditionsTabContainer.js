import { connect } from 'react-redux';
import { toggleCondition } from '../actions';
import ConditionsTab from '../components/ConditionsTab';

const mapStateToProps = (state) => {
  return {
    conditions: state.character.conditions
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onConditionToggle: (name) => {
      dispatch(toggleCondition(name));
    }
  }
};

const ConditionsTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConditionsTab);

export default ConditionsTabContainer;
