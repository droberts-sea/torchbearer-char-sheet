export const traitIsAvailable = (trait) => {
  return !(trait.level < 3 && trait.uses >= trait.level);
}