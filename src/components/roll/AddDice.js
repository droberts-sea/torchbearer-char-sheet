import React from 'react';
import PropTypes from 'prop-types';

import PlusMinus from '../shared/PlusMinus';
import Toggle from '../shared/Toggle';
import TraitDropdown from './TraitDropdown';

import './styles/AddDice.css';
import { SkillRules } from '../../rules/skills';

const formatSuggestedHelp = (skill) => {
  const captialize = w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  if (SkillRules[skill]) {
    return [skill].concat(SkillRules[skill].suggestedHelp)
      .map(captialize).join(', ');
  } else {
    return captialize(skill);
  }
}

const AddDice = ({ disabledOptions, onSetProperty, info, modifiers, character, resourcesSpent }) => {
  let blHeaderStyle = "";
  if (disabledOptions.natureInstead) {
    blHeaderStyle = "hidden";
  } else if (disabledOptions.beginnersLuckHeaders) {
    blHeaderStyle = "struck";
  }
  return (
    <ul id="roll-add-dice">
      {
        // TODO only display beginner's luck info and "roll using nature" if character does not have this skill
      }
      <Toggle
        name="Fake It (roll using Nature)"
        subtext="If you don't have the skill, you can roll with (full) Nature instead of using Beginner's Luck. If the test is outside your Nature, your Nature will be taxed by the margin of failure. If you are Afraid, this option will be selected automatically."
        disabled={disabledOptions.natureInstead || disabledOptions.unselectNatureInstead}
        active={modifiers.natureInstead}
        onToggle={(value) => onSetProperty('natureInstead', value)}
        className={
          disabledOptions.natureInstead ? "hidden" : ""
        }
      />
      <li className={blHeaderStyle}>
        <h2>Before Beginner&apos;s Luck</h2>
      </li>
      <PlusMinus
        name="Help"
        subtext={(<>
          Get help from your allies, through wises or an appropriate skill.
          <br />
          Suggested help:
          <em> {formatSuggestedHelp(info.skill)}</em>
        </>)}
        value={modifiers.help}
        min={0}
        onValueChange={(help) => onSetProperty('help', help)}
      />
      <Toggle
        name="Supplies"
        active={modifiers.supplies}
        onToggle={(value) => onSetProperty('supplies', value)}
      />
      <Toggle
        name="Gear"
        active={modifiers.gear}
        onToggle={(value) => onSetProperty('gear', value)}
      />
      <li className={blHeaderStyle}>
        <h2>After Beginner&apos;s Luck</h2>
      </li>
      <TraitDropdown
        traitName={modifiers.traitName}
        traitEffect={modifiers.traitEffect}
        characterTraits={character.traits}
        disabledOptions={disabledOptions}
        onSetProperty={onSetProperty}
      />
      <li>
        <p>
          <b>
            {character.points.persona.available - resourcesSpent.persona} persona available
          </b>
        </p>
      </li>
      <PlusMinus
        name="Persona Dice"
        subtext="Spend up to three Persona to gain extra dice on any roll."
        value={modifiers.personaDice}
        min={0}
        max={disabledOptions.maxPersonaDice}
        onValueChange={(personaDice) => onSetProperty('personaDice', personaDice)}
      />
      <Toggle
        name="Ancestral Insight (tap Nature)"
        subtext="Spend a Persona to add your Nature to this test. If the test is outside your Nature, Nature will be taxed by one."
        disabled={disabledOptions.tapNature}
        active={modifiers.tapNature}
        onToggle={(value) => onSetProperty('tapNature', value)}
      />
      {
        // TODO: indicator for fresh (non-interactive)
      }
    </ul>
  );
}

AddDice.propTypes = {
  disabledOptions: PropTypes.object.isRequired,
  onSetProperty: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired,
  modifiers: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
  resourcesSpent: PropTypes.object.isRequired,
};

export default AddDice;
