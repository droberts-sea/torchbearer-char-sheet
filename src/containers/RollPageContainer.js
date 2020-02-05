import { connect } from 'react-redux';
import {
  rollReset,
  rollRollDice,
  rollAccept,
  rollCommitResults,
  rollSetInfo,
  rollSetModifier,
  rollSetReaction,
  rollGotoPage,
} from '../actions/roll_actions';
import RollPage from '../components/roll/RollPage';
import calculateDerivedRollState from '../derivers/roll/derived_state';
import addDiceDisabledOptions from '../derivers/roll/add_dice_disabled_options';
import resultsDisabledOptions from '../derivers/roll/results_disabled_options';
import impact from '../derivers/roll/impact';
import rollNavStatus from '../derivers/roll/roll_nav_status';

const mapStateToProps = (state) => {
  const rollImpact = impact(state.roll, state.character);
  return {
    ...state.roll,
    navStatus: rollNavStatus(state.roll),
    character: state.character,
    derived: calculateDerivedRollState(state.roll, state.character),
    disabledOptions: {
      addDice: addDiceDisabledOptions(state.roll, state.character, rollImpact.points.total),
      results: resultsDisabledOptions(state.roll, state.character, rollImpact.points.total),
    },
    impact: rollImpact,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    operations: {
      reset: () => {
        dispatch(rollReset());
      },
      rollDice: () => {
        dispatch(rollRollDice());
      },
      accept: () => {
        dispatch(rollAccept());
      },
      commitResults: () => {
        dispatch(rollCommitResults());
      }
    },
    onGotoPage: (page) => {
      dispatch(rollGotoPage(page));
    },
    onSetInfo: (prop, value) => {
      dispatch(rollSetInfo(prop, value));
    },
    onSetModifier: (prop, value) => {
      dispatch(rollSetModifier(prop, value));
    },
    onSetReaction: (prop, value) => {
      dispatch(rollSetReaction(prop, value));
    }
  };
};

const RollPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RollPage);

export default RollPageContainer;
