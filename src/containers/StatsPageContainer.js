import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StatsPage from '../components/stats/StatsPage';
import {
  markTest,
  markTrait,
  setSkillDisplay,
  editCharacterProperty,
  editCharacterAddField,
  editCharacterRemoveField,
} from '../actions';
import validateEdits from '../derivers/character/validate_edits';

const mapStateToProps = (state) => {
  let character = state.character;

  if (state.ui.editCharacter.editMode) {
    character = state.ui.editCharacter.character;
  }

  return {
    abilities: character.abilities,
    wises: character.wises,
    traits: character.traits,
    skills: character.skills,
    ui: state.ui,
    character: character,
    errors: validateEdits(state.ui.editCharacter.character),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      markTest,
      markTrait,
      setSkillDisplay,
      editCharacterProperty,
      editCharacterAddField,
      editCharacterRemoveField,
    }, dispatch),
  };
};

const StatsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsPage);

export default StatsPageContainer;
