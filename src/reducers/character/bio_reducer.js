import { InitialBio } from '../../rules/initial_character';
import {
  RESET_CHARACTER,
  IMPORT_CHARACTER,
  EDIT_CHARACTER_COMMIT
} from '../../actions';

const bioReducer = (state = InitialBio, action) => {
  switch (action.type) {
    case RESET_CHARACTER:
      return InitialBio;

    case IMPORT_CHARACTER:
    case EDIT_CHARACTER_COMMIT:
      return action.payload.bio;

    default:
      break;
  }
  console.log(state);
  return state;
};

export default bioReducer;