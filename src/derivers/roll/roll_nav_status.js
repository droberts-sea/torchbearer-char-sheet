import { ROLL_PAGES } from '../../actions/roll_actions';
import { ROLL_STAGES } from '../../reducers/roll/roll_reducer';

const rollNavStatus = (roll) => {
  const navStatus = {
    pageIndex: roll.pageIndex,
    pageName: ROLL_PAGES[roll.pageIndex],
    back: {
      target: roll.pageIndex - 1,
      disabled: !ROLL_PAGES[roll.pageIndex - 1],
    },
    forward: {
      target: roll.pageIndex + 1,
      disabled: !ROLL_PAGES[roll.pageIndex + 1],
    },
  };

  if (ROLL_PAGES[roll.pageIndex] === 'READY' &&
    roll.stage === ROLL_STAGES.PRE_ROLL) {
    navStatus.forward.disabled = true;
  }

  if (ROLL_PAGES[roll.pageIndex] === 'REACT' &&
    roll.stage === ROLL_STAGES.REACT) {
    navStatus.forward.disabled = true;
  }

  return navStatus;
};

export default rollNavStatus;