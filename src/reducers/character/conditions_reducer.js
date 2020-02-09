import { SET_CONDITION, RESET_CHARACTER, IMPORT_CHARACTER } from '../../actions';
import { Conditions, ConditionRules } from '../../rules/conditions';

const InitialConditions = {};
Object.keys(ConditionRules).forEach((name) => {
  InitialConditions[name] = ConditionRules[name].default_state;
});

const conditionsReducer = function (state = InitialConditions, action) {
  switch (action.type) {
    case SET_CONDITION:
      const name = action.payload.condition;
      const newConditions = { ...state };
      newConditions[name] = action.payload.isActive;

      // Getting another condition removes fresh
      if (name !== Conditions.FRESH && newConditions[name]) {
        newConditions[Conditions.FRESH] = false;
      }

      // TODO: can't get fresh until all other conditions are clear
      return newConditions;

    case RESET_CHARACTER:
      return InitialConditions;

    case IMPORT_CHARACTER:
      return action.payload.conditions;

    default:
      return state;
  }
}

export default conditionsReducer;
