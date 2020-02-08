import { connect } from 'react-redux';

import StatsPage from '../components/stats/StatsPage';
import { markTest, markTrait, skillCollapse } from '../actions';

const mapStateToProps = (state) => {
  return {
    abilities: state.character.abilities,
    wises: state.character.wises,
    traits: state.character.traits,
    skills: state.character.skills,
    ui: state.ui,
    character: state.character
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMarkTest: (...args) => {
      dispatch(markTest(...args));
    },
    onMarkTrait: (name, increase) => {
      dispatch(markTrait(name, increase));
    },
    onSkillCollapse: () => {
      dispatch(skillCollapse());
    }
  };
};

const StatsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsPage);

export default StatsPageContainer;
