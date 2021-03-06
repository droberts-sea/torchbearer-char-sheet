import { skillReadyToAdvance } from "../../rules/skills";
import { PointCategories } from "../../actions";

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
      errors.add(index, 'name', "can't be blank");
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
        errors.add(index, 'name', "must be unique");
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

  traits.forEach((trait, index) => {
    if (trait.level < 1 || trait.level > 3) {
      errors.add(index, 'level', "must be between 1 and 3");
    }
  });

  return errors;
};

const validateRatings = (skills, untaxedNature, errors) => {
  Object.keys(skills).forEach((skillName) => {
    const skill = skills[skillName];
    if (skill.rating > skill.max || skill.rating < skill.min) {
      errors.add(skillName, 'rating', `must be between ${skill.min} and ${skill.max}`);
    }

    // MIGHT doesn't track advancement
    if (skill.advancement) {
      if (skill.advancement.pass < 0) {
        errors.add(skillName, 'pass', "must be greater than 0");
      }

      if (skill.advancement.fail < 0) {
        errors.add(skillName, 'fail', "must be greater than 0");
      }

      if (skillReadyToAdvance(skill, untaxedNature)) {
        errors.add(skillName, 'pass', "skill would advance");
        errors.add(skillName, 'fail', "skill would advance");
      }
    }
  });
};

const validateSkills = (skills, character) => {
  const errors = new ValidationErrors();

  validateRatings(skills, character.abilities.NATURE.untaxed, errors);

  return errors;
}

// Blegh this is just different enough from validateNames that I couldn't merge them
const validateNameList = (names, errors, errorKey, fieldPrefix) => {
  const uniqueNames = {};

  names.forEach((name, index) => {
    if (!name || name === '') {
      errors.add(errorKey, `${fieldPrefix}-${index}`, "can't be blank");
    }

    if (uniqueNames[name]) {
      uniqueNames[name].push(index);
    } else {
      uniqueNames[name] = [index];
    }
  });

  Object.keys(uniqueNames).forEach(name => {
    if (uniqueNames[name].length > 1) {
      uniqueNames[name].forEach(index => {
        errors.add(errorKey, `${fieldPrefix}-${index}`, "must be unique");
      });
    }
  });
}

const validateAbilities = (abilities) => {
  const errors = new ValidationErrors();
  const nature = abilities.NATURE;

  validateRatings(abilities, nature.untaxed, errors);
  validateNameList(nature.descriptors, errors, 'NATURE', 'descriptor');

  if (nature.rating > nature.untaxed) {
    errors.add('NATURE', 'rating', "must be less than or equal to untaxed rating");
  }

  if (nature.untaxed < nature.min || nature.untaxed > nature.max) {
    errors.add('NATURE', 'untaxed', `must be between ${nature.min} and ${nature.max}`);
  }

  return errors;
};

const validatePoints = (points) => {
  const errors = new ValidationErrors();

  Object.keys(PointCategories).forEach(category => {
    const catName = PointCategories[category];
    if (points[catName].available < 0) {
      errors.add(catName, 'available', "must be at least 0");
    }

    if (points[catName].spent < 0) {
      errors.add(catName, 'spent', "must be at least 0");
    }
  });

  return errors;
};

const validateEdits = (character) => {
  if (!character) {
    return undefined;
  }

  return {
    abilities: validateAbilities(character.abilities),
    points: validatePoints(character.points),
    skills: validateSkills(character.skills, character),
    traits: validateTraits(character.traits),
    wises: validateWises(character.wises),
  };
}

export default validateEdits;