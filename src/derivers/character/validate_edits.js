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

const validateWises = (wises) => {
  const errors = new ValidationErrors();
  const names = {};

  wises.forEach((wise, index) => {
    if (!wise.name || wise.name === '') {
      errors.add(index, 'name', "can't be blank");
    }

    if (names[wise.name]) {
      names[wise.name].push(index);
    } else {
      names[wise.name] = [index];
    }
  });

  Object.keys(names).forEach(name => {
    if (names[name].length > 1) {
      names[name].forEach(index => {
        errors.add(index, 'name', "duplicate name");
      });
    }
  });

  return errors;
}


const validateEdits = (character) => {
  return {
    wises: validateWises(character.wises),
  };
}

export default validateEdits;