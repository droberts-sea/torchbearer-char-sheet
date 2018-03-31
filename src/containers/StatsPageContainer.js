import { connect } from 'react-redux';

import StatsPage from '../components/stats/StatsPage';
import { markTest, skillCollapse } from '../actions';

const mapStateToProps = (state) => {
  return {
    abilities: state.character.abilities,
    skills: state.character.skills,
    ui: state.ui,
    character: state.character
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMarkTest: (skillName, result) => {
      dispatch(markTest(skillName, result));
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
