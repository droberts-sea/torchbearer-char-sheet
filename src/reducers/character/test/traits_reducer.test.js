import traitsReducer from '../traits_reducer';
import { InitialTraits } from '../traits_reducer';
import { MARK_TRAIT } from '../../../actions';
import { ROLL_RESET } from '../../../actions/roll_actions';

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

describe(traitsReducer, () => {
  let action;
  it('runs without crashing', () => {
    action = { type: ROLL_RESET };
    traitsReducer(InitialTraits, action);
  });

  describe('MARK_TRAIT action', () => {
    let traits;
    beforeEach(() => {
      traits = deepCopy(InitialTraits);
      action = {
        type: MARK_TRAIT,
        payload: {},
      };
    });

    it('increases uses of the specified trait', () => {
      const trait = traits[1];
      trait.uses = 0;

      action.payload.name = trait.name;
      action.payload.increase = true;

      const reduction = traitsReducer(traits, action);
      expect(reduction[1].name).toEqual(trait.name);
      expect(reduction[1].uses).toEqual(1);
    });

    it('decreases uses of the specified trait', () => {
      const trait = traits[1];
      trait.uses = 1;

      action.payload.name = trait.name;
      action.payload.increase = false;

      const reduction = traitsReducer(traits, action);
      expect(reduction[1].name).toEqual(trait.name);
      expect(reduction[1].uses).toEqual(0);
    });

    it("won't increase a trait's uses beyond its level", () => {
      const trait = traits[1];
      trait.uses = 1;
      trait.level = 1;

      action.payload.name = trait.name;
      action.payload.increase = true;

      let reduction = traitsReducer(traits, action);
      expect(reduction[1].name).toEqual(trait.name);
      expect(reduction[1].uses).toEqual(1);

      trait.level = 2;
      reduction = traitsReducer(traits, action);
      expect(reduction[1].name).toEqual(trait.name);
      expect(reduction[1].uses).toEqual(2);
    });

    it("won't decrease a trait's uses below 0", () => {
      const trait = traits[1];
      trait.uses = 0;

      action.payload.name = trait.name;
      action.payload.increase = false;

      const reduction = traitsReducer(traits, action);
      expect(reduction[1].name).toEqual(trait.name);
      expect(reduction[1].uses).toEqual(0);
    });

    it("does not affect level 3 traits", () => {
      const trait = traits[1];
      trait.uses = 0;
      trait.level = 3;

      action.payload.name = trait.name;
      action.payload.increase = true;

      const reduction = traitsReducer(traits, action);
      expect(reduction[1].name).toEqual(trait.name);
      expect(reduction[1].uses).toEqual(0);
    });
  });
});