import React from 'react';
import PropTypes from 'prop-types';

import './styles/BioPage.css';

const BioProperty = ({ name, text = '', inline, editMode, onEdit }) => {
  if (editMode) {
    let knob;
    if (inline) {
      knob = <input
        className="inline"
        name={name}
        type="text"
        value={text}
        onChange={event => onEdit(name, event.target.value)}
      />;
    } else {
      knob = <textarea
        className="block"
        rows="4"
        name={name}
        value={text}
        onChange={event => onEdit(name, event.target.value)}
      />;
    }
    return (
      <>
        <h3 htmlFor={name} className={inline ? 'inline' : 'block'}>{name}</h3>
        {knob}
      </>
    );
  } else {
    return (
      <>
        <h3 className={inline ? 'inline' : 'block'}>{name}</h3>
        <p className={inline ? 'inline' : 'block'}>{text}</p>
      </>
    );
  }
};

const properties = [
  { name: 'name', inline: true },
  { name: 'stock', inline: true },
  { name: 'class', inline: true },
  { name: 'level', inline: true },
  { name: 'belief', inline: false },
  { name: 'goal', inline: false },
  { name: 'instinct', inline: false },
  { name: 'alginment', inline: true },
  { name: 'raiment', inline: true },
  { name: 'age', inline: true },
  { name: 'home', inline: true },
  { name: 'parents', inline: true },
  { name: 'mentor', inline: true },
  { name: 'friend', inline: true },
  { name: 'enemy', inline: true },
  { name: 'additional allies and enemies', inline: false },
]

const BioPage = ({ bio, editMode, actions }) => {
  return (
    <div className="bio-page">
      {
        properties.map(property =>
          <BioProperty
            key={property.name}
            {...property}
            text={bio[property.name]}
            editMode={editMode}
            onEdit={(field, value) => actions.editCharacterProperty(value, 'bio', field)}
          />
        )
      }
    </div>
  );
};

BioPage.defaultProps = {

};

BioPage.propTypes = {
  bio: PropTypes.object.isRequired,
  editMode: PropTypes.bool,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default BioPage;
