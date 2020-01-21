import React from 'react';
import PropTypes from 'prop-types';

import Control from '../shared/Control';
import Checkbox from '../shared/Checkbox';

import { traitIsAvailable } from '../../rules/traits';

import './styles/TraitDropdown.css';

const TraitOption = ({ name, text, onSetProperty, ...props }) => {
  return (
    <div className="trait-option">
      <Checkbox
        {...props}
        onToggle={() => onSetProperty('traitEffect', name)}
        id={name}
      />
      <label htmlFor={name}>{text}</label>
    </div>
  );
};

const TraitOptions = ({ traitName, traitEffect, currentTrait, onSetProperty, disabledOptions }) => {
  // Don't show trait options unless the a trait has been selected
  if (!traitName) {
    return null;
  }

  const benefit = currentTrait.level === 3 ? "+1S" : "+1D";

  return (
    <React.Fragment>
      <TraitOption
        name="benefit"
        text={`${benefit} benefit`}
        active={traitEffect === 'benefit'}
        disabled={disabledOptions.traitBenefit}
        onSetProperty={onSetProperty}
      />
      <TraitOption
        name="penalty"
        text="-1D penalty (one check)"
        active={traitEffect === 'penalty'}
        onSetProperty={onSetProperty}
      />
      <TraitOption
        name="opponent"
        text="+2D to opponent (two checks)"
        active={traitEffect === 'opponent'}
        disabled={disabledOptions.traitOpponent}
        onSetProperty={onSetProperty}
      />
    </React.Fragment>
  );
}

const TraitDropdown = (props) => {
  const value = props.traitName || "none";
  const currentTrait = props.characterTraits.find(trait => trait.name === props.traitName);
  return (
    <Control
      className="trait-dropdown"
      name="Trait"
      subtext="Use a trait to help you (limited uses per session) or hurt you (and gain a check) on this roll."
      knob={(
        <React.Fragment>
          <select
            value={value}
            onChange={(event) => {
              console.log(`trait selected: ${event.target.value}`);
              props.onSetProperty('traitName', event.target.value)
            }}
          >
            <option key="none" value="none">
              None
            </option>
            {
              props.characterTraits.map((trait) => {
                const availability = traitIsAvailable(trait) ? "available" : "unavailable";
                return (
                  <option
                    key={`td_${trait.name}`}
                    value={trait.name}
                  >
                    {`${trait.name} (lv.${trait.level}) - ${availability}`}
                  </option>
                );
              })
            }
          </select>
          <TraitOptions
            {...props}
            currentTrait={currentTrait}
          />
        </React.Fragment>
      )}
    />
  );
};

TraitDropdown.propTypes = {
  traitName: PropTypes.string,
  traitEffect: PropTypes.string,
  characterTraits: PropTypes.array.isRequired,
  disabledOptions: PropTypes.object.isRequired,
  onSetProperty: PropTypes.func.isRequired,
}

export default TraitDropdown;