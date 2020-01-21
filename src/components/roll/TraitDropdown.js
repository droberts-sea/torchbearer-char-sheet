import React from 'react';
import PropTypes from 'prop-types';

import Control from '../shared/Control';
import Checkbox from '../shared/Checkbox';

import './styles/TraitDropdown.css';

const checkboxClickHandler = (value, checked) => {
  console.log(`someone clicked on ${value}, setting it to ${checked}`);
}

const TraitOption = ({ name, text, ...props }) => {
  return (
    <div className="trait-option">
      <Checkbox
        {...props}
        onToggle={(checked) => checkboxClickHandler(name, checked)}
        id={name}
      />
      <label htmlFor={name}>{text}</label>
    </div>
  );
};

const traitIsAvailable = (trait) => {
  return !(trait.level < 3 && trait.uses >= trait.level);
}

const TraitOptions = ({ traitName, traitEffect, currentTrait, isVersus }) => {
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
      />
      <TraitOption
        name="penalty"
        text="-1D Penalty"
        active={traitEffect === 'penalty'}
      />
      <TraitOption
        name="opponent"
        text="+2D to Opponent"
        active={traitEffect === 'opponent'}
        disabled={!isVersus}
      />
    </React.Fragment>
  );
}

const TraitDropdown = ({ traitName, traitEffect, characterTraits, isVersus }) => {
  const value = traitName || "none";
  const currentTrait = characterTraits.find(trait => trait.name == traitName);
  return (
    <Control
      className="trait-dropdown"
      name="Trait"
      knob={(
        <React.Fragment>
          <select
            value={value}
            onChange={(event) => {
              console.log("trait selected");
            }}
          >
            <option key="none" value="none">
              None
            </option>
            {
              characterTraits.map((trait) => {
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
            traitName={traitName}
            traitEffect={traitEffect}
            currentTrait={currentTrait}
            isVersus={isVersus}
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
}

export default TraitDropdown;