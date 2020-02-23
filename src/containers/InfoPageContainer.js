import { connect } from 'react-redux';
import {
  toggleCondition,
  addPoint,
  spendPoint,
  editCharacterProperty,
} from '../actions';
import validateEdits from '../derivers/character/validate_edits';
import InfoPage from '../components/info/InfoPage';

const mapStateToProps = (state) => {
  let character = state.character;

  if (state.ui.editCharacter.editMode) {
    character = state.ui.editCharacter.character;
  }

  return {
    conditions: character.conditions,
    points: character.points,
    ui: state.ui,
    errors: validateEdits(character),
  };
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
    },
    editCharacterProperty: (...args) => {
      dispatch(editCharacterProperty(...args));
    },
  }
};

const InfoPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoPage);

export default InfoPageContainer;
