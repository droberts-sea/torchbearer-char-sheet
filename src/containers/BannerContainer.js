import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import Banner from '../components/banner/Banner';

// import {
// } from '../actions';

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    roll: state.roll,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     actions: bindActionCreators({
//     }, dispatch)
//   };
// };

const BannerContainer = connect(
  mapStateToProps,
  // mapDispatchToProps
)(Banner);

export default BannerContainer;
