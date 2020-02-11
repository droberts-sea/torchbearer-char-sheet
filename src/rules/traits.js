export const traitIsAvailable = (trait) => {
  return !(trait.level < 3 && trait.uses >= trait.level);
}

export const newTrait = (id, name = '', level = 1, uses = 0) => {
  return { id, name, level, uses };
}