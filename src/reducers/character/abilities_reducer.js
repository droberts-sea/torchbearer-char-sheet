import { MARK_TEST, RESET_CHARACTER, IMPORT_CHARACTER, EDIT_CHARACTER_COMMIT } from '../../actions';
import { advanceSkill } from './skills_reducer';
import { ROLL_COMMIT_RESULTS } from '../../actions/roll_actions';
import { InitialAbilities } from '../../rules/initial_character';

const markTest = function (state, effect, character) {
  // We use the MARK_TEST action for both skills and abilities
  const ability = effect.name;
  if (effect.category !== 'abilities' ||
    !state[ability] ||
    ability === 'MIGHT') {
    return state;
  }

  const newState = { ...state };
  newState[ability] = advanceSkill(state[ability], effect.mark, character);

  return newState;
}

const taxNature = (state, amount) => {
  const newState = { ...state };
  newState.NATURE.rating -= amount;
  if (newState.NATURE.rating <= 0) {
    newState.NATURE.untaxed -= 1;
    newState.NATURE.rating = newState.NATURE.untaxed;

    // TODO nature to 0?
  }
  return newState;
}

const abilitiesReducer = function (state = InitialAbilities, action, character) {
  switch (action.type) {
    case MARK_TEST:
      return markTest(state, action.payload, character);

    case ROLL_COMMIT_RESULTS:
      // Engineering decision: tax comes first. See also derivers/roll/impact.js
      if (action.payload.taxNature) {
        state = taxNature(state, action.payload.taxNature.total)
      }
      state = markTest(state, action.payload.skill, character);

      action.payload.outcome.wiseAdvancement.forEach(wiseAdvancement => {
        if (wiseAdvancement.selectedPerk === 'mark-test') {
          const effect = {
            name: wiseAdvancement.selectedSkill,
            category: 'abilities', // XXX this is BS but we don't have a good way to get the category and markTest checks for list inclusion anyway.
            mark: wiseAdvancement.mark,
          };
          state = markTest(state, effect, character);
        }
      });

      return state;

    case RESET_CHARACTER:
      return InitialAbilities;

    case IMPORT_CHARACTER:
    case EDIT_CHARACTER_COMMIT:
      return action.payload.abilities;

    default:
      return state;
  }
}

export default abilitiesReducer;
