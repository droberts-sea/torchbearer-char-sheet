import wisesReducer, { InitialWises } from '../wises_reducer';

import { deepCopy } from '../../../mock/util';
import { MARK_TEST } from '../../../actions';
import { ROLL_COMMIT_RESULTS } from '../../../actions/roll_actions';

describe(wisesReducer, () => {
  let wises;
  let action
  beforeEach(() => {
    wises = deepCopy(InitialWises);
  });
  describe(MARK_TEST, () => {
    beforeEach(() => {
      action = {
        type: MARK_TEST,
        payload: {
          category: 'wises',
        }
      }
    })
    it('marks the given wise in the given way', () => {
      action.payload.unmark = false;
      wises.forEach((wise, i) => {
        ['pass', 'fail', 'fate', 'persona'].forEach(mark => {
          action.payload.name = wise.name;
          action.payload.mark = mark;
          wise.advancement[mark] = false;

          const reduction = wisesReducer(wises, action);
          expect(reduction[i].name).toEqual(wise.name);
          expect(reduction[i].advancement[mark]).toBeTruthy();
        });
      });
    });

    it('unmarks the given wise in the given way', () => {
      action.payload.unmark = true;
      wises.forEach((wise, i) => {
        ['pass', 'fail', 'fate', 'persona'].forEach(mark => {
          action.payload.name = wise.name;
          action.payload.mark = mark;
          wise.advancement[mark] = true;

          const reduction = wisesReducer(wises, action);
          expect(reduction[i].name).toEqual(wise.name);
          expect(reduction[i].advancement[mark]).toBeFalsy();
        });
      });
    });

    it('ignores categories other than wises', () => {
      action.payload.category = 'skills';
      action.payload.name = "CARPENTER";
      action.payload.mark = 'pass';

      const reduction = wisesReducer(wises, action);
      expect(reduction).toEqual(wises);
    });
  });

  describe(ROLL_COMMIT_RESULTS, () => {
    beforeEach(() => {
      action = {
        type: ROLL_COMMIT_RESULTS,
        payload: {
          wises: [],
          outcome: {
            wiseAdvancement: [],
          },
        },
      };
    })
    it('does nothing for an empty wise list', () => {
      const reduction = wisesReducer(wises, action);
      expect(reduction).toEqual(wises);
    });

    it('updates each marked wise', () => {
      wises.forEach(wise => {
        wise.advancement.fate = false;
        wise.advancement.persona = false;
      });
      action.payload.wises = [
        { name: wises[1].name, mark: 'persona' },
        { name: wises[0].name, mark: 'fate' },
      ];
      const reduction = wisesReducer(wises, action);
      expect(reduction[0].name).toEqual(wises[0].name);
      expect(reduction[0].advancement.fate).toBeTruthy();

      expect(reduction[1].name).toEqual(wises[1].name);
      expect(reduction[1].advancement.persona).toBeTruthy();
    });

    it('clears the slate for wises marked for advancement', () => {
      wises[0].advancement = {
        pass: true,
        fail: true,
        fate: true,
        persona: false,
      };
      action.payload.wises = [
        { name: wises[0].name, mark: 'persona' },
      ];
      action.payload.outcome.wiseAdvancement = [{
        name: wises[0].name,
        selectedPerk: 'mark-test',
      }];

      const reduction = wisesReducer(wises, action);
      expect(reduction[0].name).toEqual(wises[0].name);
      expect(reduction[0].advancement).toEqual({
        pass: false, fail: false, fate: false, persona: false,
      });
    });

    it('changes the name of a wise where a name change was selected', () => {
      wises[0].advancement = {
        pass: true,
        fail: true,
        fate: true,
        persona: false,
      };
      action.payload.wises = [
        { name: wises[0].name, mark: 'persona' },
      ];

      const newName = 'new name';
      action.payload.outcome.wiseAdvancement = [{
        name: wises[0].name,
        selectedPerk: 'change-wise',
        newWiseName: newName,
      }];

      const reduction = wisesReducer(wises, action);
      expect(reduction[0].name).toEqual(newName);
    });
  });
});