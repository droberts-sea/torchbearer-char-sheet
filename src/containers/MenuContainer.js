import { connect } from 'react-redux';
import Menu from '../components/menu/Menu';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return {
    ...state.ui.menu,
    character: state.character,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ }, dispatch);
};

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

export default MenuContainer;
