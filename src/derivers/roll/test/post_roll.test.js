import postRollDerived from '../post_roll';

describe(postRollDerived, () => {
  // TODO: test everything else in this damn function
  
  describe('conditional successes', () => {
    it('adds conditional successes to a passed roll', () => {
      const rolledDice = [
        { face: 3 },
        { face: 4 },
        { face: 5 },
      ];

      const rollSummary = {
        ob: 2,
        addSuccesses: 0,
        conditionalSuccesses: 1
      }

      const post = postRollDerived(rolledDice, rollSummary);

      expect(post.outcome).toBe('pass');
      expect(post.successes.length).toBe(2);
      expect(post.totalSuccesses).toBe(3);
    });

    it.skip('adds conditional successes to a tied roll', () => {
      // TODO: implement once versus rolls exist
    });

    it('adds conditional successes to a passed roll', () => {
      const rolledDice = [
        { face: 3 },
        { face: 4 },
        { face: 5 },
      ];

      const rollSummary = {
        ob: 3,
        addSuccesses: 0,
        conditionalSuccesses: 1
      }

      const post = postRollDerived(rolledDice, rollSummary);

      expect(post.outcome).toBe('fail');
      expect(post.successes.length).toBe(2);
      expect(post.totalSuccesses).toBe(2);
    });
  });
});