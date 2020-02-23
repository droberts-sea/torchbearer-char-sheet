import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
