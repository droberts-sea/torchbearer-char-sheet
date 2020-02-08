import wisesReducer, { InitialWises } from '../wises_reducer';

import { deepCopy } from '../../../mock/util';
import { MARK_TEST } from '../../../actions';

describe(wisesReducer, () => {
  let wises;
  let action
  beforeEach(() => {
    wises = deepCopy(InitialWises);
  });
  describe('MARK_TEST action', () => {
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
});