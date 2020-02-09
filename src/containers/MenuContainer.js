import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Menu from '../components/menu/Menu';

import { resetCharacter, importCharacter } from '../actions';

const mapStateToProps = (state) => {
  return {
    ...state.ui.menu,
    character: state.character,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      resetCharacter,
      importCharacter
    }, dispatch)
  };
};

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

export default MenuContainer;
