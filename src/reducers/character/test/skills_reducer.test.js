import { deepCopy } from '../../../mock/util';
import { MARK_TEST } from '../../../actions';
import { ROLL_COMMIT_RESULTS, ROLL_RESET } from '../../../actions/roll_actions';
import skillsReducer from '../skills_reducer';
import mockCharacter from '../../../mock/character';

describe(skillsReducer, () => {
  let skills;
  let action;
  it('runs without crashing', () => {
    action = {
      type: ROLL_RESET,
      payload: {},
    };
    skillsReducer(mockCharacter.skills, action, mockCharacter);
  })

  describe.skip(MARK_TEST, () => {
  });

  describe.skip(ROLL_COMMIT_RESULTS, () => {

  });
});