import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StatsPage from '../components/stats/StatsPage';
import {
  markTest,
  markTrait,
  skillCollapse,
  editCharacterProperty,
  editCharacterAddField,
  editCharacterRemoveField,
} from '../actions';

const mapStateToProps = (state) => {
  let character = state.character;
  if (state.ui.editCharacter.editMode) {
    // character = state.ui.editCharacter.character;
  }
  return {
    abilities: character.abilities,
    wises: character.wises,
    traits: character.traits,
    skills: character.skills,
    ui: state.ui,
    character: character
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      markTest,
      markTrait,
      skillCollapse,
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
