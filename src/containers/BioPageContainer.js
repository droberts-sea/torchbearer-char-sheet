import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BioPage from '../components/bio/BioPage';

import {
  editCharacterProperty,
} from '../actions';

const mapStateToProps = (state) => {
  let character = state.character;

  if (state.ui.editCharacter.editMode) {
    character = state.ui.editCharacter.character;
  }

  return {
    bio: character.bio,
    editMode: state.ui.editCharacter.editMode,
    // errors: validateBio(character),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      editCharacterProperty,
    }, dispatch)
  };
};

const BioPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BioPage);

export default BioPageContainer;
