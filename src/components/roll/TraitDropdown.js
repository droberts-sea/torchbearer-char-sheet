import React from 'react';
import PropTypes from 'prop-types';

import Control from '../shared/Control';
import Checkbox from '../shared/Checkbox';

import './styles/TraitDropdown.css';

const checkboxClickHandler = (value, checked) => {
  console.log(`someone clicked on ${value}, setting it to ${checked}`);
}

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

const traitIsAvailable = (trait) => {
  return !(trait.level < 3 && trait.uses >= trait.level);
}

const TraitOptions = ({ traitName, traitEffect, currentTrait, isVersus, onSetProperty }) => {
  // Don't show trait options unless the a trait has been selected
  if (!traitName) {
    return null;
  }

  // TODO: should enabled/disabled come in through disabledOptions?

  return (
    <React.Fragment>
      <TraitOption
        name="benefit"
        text="+1D Benefit"
        active={traitEffect === 'benefit'}
        disabled={!traitIsAvailable(currentTrait)}
        onSetProperty={onSetProperty}
      />
      <TraitOption
        name="penalty"
        text="-1D Penalty"
        active={traitEffect === 'penalty'}
        onSetProperty={onSetProperty}
      />
      <TraitOption
        name="opponent"
        text="+2D to Opponent"
        active={traitEffect === 'opponent'}
        disabled={!isVersus}
        onSetProperty={onSetProperty}
      />
    </React.Fragment>
  );
}

const TraitDropdown = (props) => {
  const value = props.traitName || "none";
  const currentTrait = props.characterTraits.find(trait => trait.name == props.traitName);
  return (
    <Control
      className="trait-dropdown"
      name="Trait"
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
  isVersus: PropTypes.bool.isRequired,
  onSetProperty: PropTypes.func.isRequired,
}

export default TraitDropdown;