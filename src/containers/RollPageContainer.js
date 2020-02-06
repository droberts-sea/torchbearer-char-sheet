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
import preRollDerived from '../derivers/roll/pre_roll';
import postRollDerived from '../derivers/roll/post_roll';
import addDiceDisabledOptions from '../derivers/roll/add_dice_disabled_options';
import resultsDisabledOptions from '../derivers/roll/results_disabled_options';
import impact from '../derivers/roll/impact';
import rollNavStatus from '../derivers/roll/roll_nav_status';

const mapStateToProps = (state) => {
  const preRoll = preRollDerived(state.roll, state.character);
  const postRoll = postRollDerived(state.roll.results.rolledDice, preRoll.summary);
  const rollImpact = impact(state.roll, state.character, postRoll);
  return {
    ...state.roll,
    character: state.character,
    navStatus: rollNavStatus(state.roll),
    preRollDerived: preRoll,
    postRollDerived: postRoll,
    impact: rollImpact,
    disabledOptions: {
      addDice: addDiceDisabledOptions(state.roll, state.character, rollImpact.points.total),
      results: resultsDisabledOptions(state.roll, state.character, rollImpact.points.total),
    },
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
