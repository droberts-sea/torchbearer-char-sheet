import React from 'react';
import PropTypes from 'prop-types';
import Control from '../shared/Control';
import SkillAbilityDropdown from './SkillAbilityDropdown';
import Checkbox from '../shared/Checkbox';

import './styles/WiseAdvancement.css';

const WiseAdvancement = ({ wise, character, wiseAdvancement, onSetWiseAdvancement }) => {
  return (
    <div className="wise-advancement">
      <h3>Wise Advancement</h3>
      <p>Your wise <em>{wise.name}</em> is ready to advance! Pick one of the following perks:</p>
      <ul>
        <Control
          name="Change the wise"
          className={wiseAdvancement.selectedPerk === 'change-wise' ? 'selected' : undefined}
          onClick={() => {onSetWiseAdvancement('selectedPerk', 'change-wise')}}
          knob={(<>
            <input
              type="text"
              placeholder={wise.name}
              name="new-wise-name"
              value={wiseAdvancement.newWiseName}
              onChange={e => onSetWiseAdvancement('newWiseName', e.target.value)}
              />
            <label htmlFor="new-wise-name">-wise</label>
          </>)}
          />

        {/* TODO: disable for sick (can't mark tests) */}
        <SkillAbilityDropdown
          name="Mark a test for a skill or ability"
          character={character}

          className={wiseAdvancement.selectedPerk === 'mark-test' ? 'selected' : undefined}
          onClick={() => {onSetWiseAdvancement('selectedPerk', 'mark-test')}}

          current={wiseAdvancement.selectedSkill}
          onSelectSkill={skill => onSetWiseAdvancement('selectedSkill', skill)}

          extraKnob={(<>
            <Checkbox
              active={wiseAdvancement.mark === 'pass'}
              onToggle={() => onSetWiseAdvancement('mark', 'pass')}
            />
            <label>pass</label>
            <Checkbox
              active={wiseAdvancement.mark === 'fail'}
              onToggle={() => onSetWiseAdvancement('mark', 'fail')}
            />
            <label>fail</label>
          </>)}
          />
      </ul>
    </div>
  );
};

WiseAdvancement.propTypes = {
  wise: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
  wiseAdvancement: PropTypes.object.isRequired,
  onSetWiseAdvancement: PropTypes.func.isRequired,
};

export default WiseAdvancement;