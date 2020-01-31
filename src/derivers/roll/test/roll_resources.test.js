import roll_resources from '../roll_resources';

import mockRoll from '../../../mock/roll';

describe('resources', () => {
  it('runs without crashing', () => {
    roll_resources(mockRoll);
  });
});