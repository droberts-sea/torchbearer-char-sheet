// FORMAT
// problems = {
//   wises: {
//     2: {
//      name: ["can't be blank"],
//     }
//   },
//   traits: {
//     1: {
//       name: ["can't be blank"],
//       level: ["must be between 1 and 3"],
//     }
//   }
// }

class ValidationErrors {
  initialize(key, field) {
    if (!this[key]) {
      this[key] = {};
    }

    if (!this[key][field]) {
      this[key][field] = []
    }
  }

  add(key, field, problem) {
    this.initialize(key, field);
    this[key][field].push(problem);
  }
}

const validateNames = (items, errors) => {
  const names = {};

  items.forEach((item, index) => {
    if (!item.name || item.name === '') {
      errors.add(index, 'name', "name can't be blank");
    }

    if (names[item.name]) {
      names[item.name].push(index);
    } else {
      names[item.name] = [index];
    }
  });

  Object.keys(names).forEach(name => {
    if (names[name].length > 1) {
      names[name].forEach(index => {
        errors.add(index, 'name', "duplicate name");
      });
    }
  });
};

const validateWises = (wises) => {
  const errors = new ValidationErrors();
  
  validateNames(wises, errors);

  return errors;
};

const validateTraits = (traits) => {
  const errors = new ValidationErrors();
  
  validateNames(traits, errors);

  return errors;
};

const validateEdits = (character) => {
  if (!character) {
    return undefined;
  }

  return {
    traits: validateTraits(character.traits),
    wises: validateWises(character.wises),
  };
}

export default validateEdits;