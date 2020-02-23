import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// TODO: Import child component(s) here
import BioPage from '../components/bio/BioPage';

import {
} from '../actions';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
};

const BioPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BioPage);

export default BioPageContainer;
