import { traitsReducer, InitialTraits } from '../traits_reducer';
import { MARK_TRAIT } from '../../../actions';
import { ROLL_RESET } from '../../../actions/roll_actions';

describe(traitsReducer, () => {
  let action;
  // beforeEach(() => {
  //   action = {
  //     type: MARK_TRAIT,
  //   }
  // })
  it('runs without crashing', () => {
    action = { type: ROLL_RESET };
    traitsReducer(InitialTraits, action);
  });
});