import resultsDisabledOptions from '../results_disabled_options';

import mockCharacter from '../../../mock/character';
import mockRoll from '../../../mock/roll';

describe('resultsDisabledOptions', () => {
  it('runs without crashing', () => {
    resultsDisabledOptions(mockRoll, mockCharacter);
  });
});