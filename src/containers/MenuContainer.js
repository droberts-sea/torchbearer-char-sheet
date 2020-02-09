import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Menu from '../components/menu/Menu';

import {
  resetCharacter,
  importCharacter,
  editCharacterBegin,
  editCharacterCommit,
  editCharacterRevert,
} from '../actions';

const mapStateToProps = (state) => {
  return {
    ...state.ui.menu,
    ui: state.ui,
    character: state.character,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      resetCharacter,
      importCharacter,
      editCharacterBegin,
      editCharacterCommit,
      editCharacterRevert,
    }, dispatch)
  };
};

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

export default MenuContainer;
