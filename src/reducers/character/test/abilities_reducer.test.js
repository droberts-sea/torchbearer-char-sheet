import abilitiesReducer from '../abilities_reducer';

import mockCharacter from '../../../mock/character';
import { ROLL_COMMIT_RESULTS } from '../../../actions/roll_actions';
import { deepCopy } from '../../../mock/util';

describe(abilitiesReducer, () => {
  describe(ROLL_COMMIT_RESULTS, () => {
    describe('tax nature', () => {
      let action;
      let character;
      beforeEach(() => {
        character = deepCopy(mockCharacter);
        action = {
          type: ROLL_COMMIT_RESULTS,
          payload: {
            skill: {
              category: 'skills',
              name: Object.keys(character.skills)[0],
              mark: 'fail',
            },
            taxNature: { total: undefined },
          }
        };
      });

      it('subtracts the correct amount from nature', () => {
        character.abilities.NATURE.rating = 3;
        character.abilities.NATURE.untaxed = 5;

        action.payload.taxNature.total = 2;
        const reduction = abilitiesReducer(character.abilities, action, character);
        expect(reduction.NATURE.rating).toEqual(1);
        expect(reduction.NATURE.untaxed).toEqual(character.abilities.NATURE.untaxed);
      });

      it('depletes max nature if taxed to 0', () => {
        character.abilities.NATURE.rating = 3;
        character.abilities.NATURE.untaxed = 5;

        action.payload.taxNature.total = 3;
        const reduction = abilitiesReducer(character.abilities, action, character);
        expect(reduction.NATURE.rating).toEqual(4);
        expect(reduction.NATURE.untaxed).toEqual(4);
      });

      it('depletes max nature if taxed past 0', () => {
        character.abilities.NATURE.rating = 3;
        character.abilities.NATURE.untaxed = 5;

        action.payload.taxNature.total = 10;
        const reduction = abilitiesReducer(character.abilities, action, character);
        expect(reduction.NATURE.rating).toEqual(4);
        expect(reduction.NATURE.untaxed).toEqual(4);
      });

    });
  });
});