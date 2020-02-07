export const skillReadyToAdvance = (skill, untaxedNature, mark) => {
  const advancement = { ...skill.advancement };
  if (mark) {
    advancement[mark] += 1;
  }

  if (skill.open) {
    // An ability or skill advances when you pass a number of tests equal to its current rating and fail a number of tests equal to one less than its rating. (pg 104)
    return (
      skill.rating < skill.max &&
      advancement.pass >= skill.rating &&
      advancement.fail >= skill.rating - 1
    );

  } else {
    // Beginners Luck - Once you have attempted to use that skill a number of times equal to your current untaxed Nature rating, you learn the skill (pg 30)
    const attempts = advancement.pass + advancement.fail;
    return attempts >= untaxedNature;

  }
}

export const SkillRules = {
  ALCHEMIST: {
    description: "The Alchemist skill is used primarily by magicians and wise (or foolish) sages to create potions, tinctures, acids or eldritch preparations.",
    supplies: "For supplies, alchemists can use records from scholars, herbs and roots collected by scavengers or blood, bone or tissue collected by hunters or herders.",
    suggestedHelp: ["LORE_MASTER"],
    beginnersLuck: "WILL",
    uses: "make elixirs to cure Afraid, Angry, or Exhausted, make elixirs that inflict conditions, create potion bases (absorbs and stores a spell), create firebombs",
  },
  ARCANIST: {
    description: "An arcanist draws upon will and knowledge to command the elements and shape raw aether. It is the exclusive domain of magicians and mystical creatures. Use Arcanist to cast spells.",
    supplies: "Arcanists can use supplies from many professions. See individual spells for details.",
    suggestedHelp: ["LORE_MASTER"],
    beginnersLuck: "WILL",
    uses: "casting spells, Banish/Abjure conflicts",
  },
  ARMORER: {
    description: "Armorers craft armor and weapons for adventurers, knights and soldiers.",
    supplies: "Armorers use supplies from smiths, tanners, weavers and laborers.",
    suggestedHelp: ["ALCHEMIST", "SMITH"],
    beginnersLuck: "HEALTH",
    uses: "repairing damaged armor",
  },
  CARPENTER: {
    description: "A carpenter makes useful items out of wood, like chairs, doors, cabinets, ladders, joints, pulleys, levers and boats.",
    supplies: "Supplies of lumber from laborers and tools from a smith are always welcome.",
    suggestedHelp: ["LABORER", "ALCHEMIST"],
    beginnersLuck: "HEALTH",
    uses: "weakening or shoring up wooden structures",
  },
  CARTOGRAPHER: {
    description: "A cartographer creates and interprets maps. This skill is essential to adventurers, explorers and caravan masters.",
    supplies: "Supplies of paper from millers and ink from alchemists are always welcome.",
    suggestedHelp: ["SCHOLAR", "PATHFINDER"],
    beginnersLuck: "WILL",
    uses: "mapping (see Adventure Phase)",
  },
  COMMANDER: {
    description: "A commander understands how to organize, supply and command a force of soldiers in battle. This skill is primarily known by captains of mercenary companies and conquerors.",
    suggestedHelp: ["STEWARD"],
    beginnersLuck: "WILL",
  },
  COOK: {
    description: "A cook prepares meals and preserves food, so every adventuring party needs a cook. Your cook can make that hunger go away when you’re out in the wild, far from home or a cozy pub. They can make bread from a handful of grain or stew from a brace of coneys and wild taters.",
    supplies: "Cooks can use supplies from hunters, peasants and scavengers.",
    suggestedHelp: ["ALCHEMIST", "LABORER"],
    beginnersLuck: "WILL",
    uses: "preserving fresh provisions (often forage or wild game), amplifying one portion of provisions to feed more people",
  },
  CRIMINAL: {
    description: "Criminals know about enterprises that aren’t, strictly speaking, legal. Whether it’s smuggling, counterfeiting, picking pockets or picking locks, criminals can get it done. Criminals are also adept at perceiving other criminals at work.",
    supplies: "Criminals can use supplies from carpenters (false panels for smuggling) and smiths (lockpicks).",
    suggestedHelp: ["SCOUT", "SCHOLAR"],
    beginnersLuck: "HEALTH",
    uses: "picking locks, picking pockets, escaping bonds",
  },
  DUNGEONEER: {
    description: "Dungeoneers are experts at exploring caves, dungeons and the ruins of lost civilizations. They are adept at disarming traps as well as traversing difficult and dangerous underground environments.",
    supplies: "Dungeoneers can use supplies from carpenters (pulleys and levers), smiths (climbing gear) and weavers (rope).",
    suggestedHelp: ["CRIMINAL", "LABORER", "SCOUT", "SURVIVALIST"],
    beginnersLuck: "HEALTH",
    uses: "traversing dangerous/narrow/slippery/flooded underground passages, detecting dungeon hazards, disarming/resetting traps (use Scout to spot traps)",
  },
  FIGHTER: {
    description: "Fighters are trained to use their bodies and weapons to slay men, beasts and monsters. This is the skill of knights, soldiers, bandits, raiders, monster hunters, warrior monks and adventurers.",
    suggestedHelp: ["FIGHTER"],
    beginnersLuck: "HEALTH",
    uses: "Capture, Drive Off, and Kill conflicts",
  },
  HAGGLER: {
    description: "Hagglers bargain over prices of goods and services exclusively in town. Using the Haggler skill allows a roll on a special Town Events table.",
    supplies: "A haggler can use scales created by jewelers, accounts prepared by a steward or forgeries created by a criminal.",
    suggestedHelp: ["PERSUADER", "MANIPULATOR"],
    beginnersLuck: "WILL",
  },
  HEALER: {
    description: "The healer keeps adventurers whole and healthy.",
    supplies: "A healer can use supplies from alchemists, peasants and scavengers in the form of herbs and medicine.",
    suggestedHelp: ["ALCHEMIST"],
    beginnersLuck: "WILL",
    uses: "create poultices to grant +1D to recover from Angry, Afraid, Exhausted, Injured, and Sick, directly treating Sick and Injured",
  },
  HUNTER: {
    description: "Noblemen, their huntsmen and poachers use this skill to lure, stalk, trap and slay beasts for food in forested preserves and in the wild.",
    supplies: "Hunters can use bows, spears, hunting swords, javelins, dogs, horses or birds of prey as tools.",
    suggestedHelp: ["LORE_MASTER"],
    beginnersLuck: "HEALTH",
    uses: "hunting for food, knowing about beasts, setting traps and snares in the wilderness, tracking, Capture conflicts",
  },
  LABORER: {
    description: "Laborers are the bulk of the workforce in villages, towns and cities. They gather wood for the carpenters, stone for the masons and metal for the smiths. They dig ditches, carry stuff and generally just do what they are told (until they get rum brave and riot). When you hit the big score in a dungeon and have lots of treasure to haul out, laborers are what you need. Anyone can carry a small sack in each hand or a large sack with both hands, but it takes skill to carry more.",
    supplies: "Laborer may be used to help the following trade or craft skill tests: Alchemist, Armorer, Carpenter, Cook, Healer, Hunter, Peasant, Sailor, Stonemason and Weaver.",
    suggestedHelp: ["LABORER"],
    beginnersLuck: "HEALTH",
    uses: "carrying two small sacks in one hand, carrying a large sack in one hand, carting bulky treasure out of the dungeon, useful as help for many skills",
  },
  LORE_MASTER: {
    description: "Lore masters are the keepers of arcane knowledge and the deep mysteries. A lore master may plumb the secrets of the natural world to understand the workings of magician spells, recall forgotten lore and read auras (using the Supernal Vision spell).",
    suggestedHelp: ["SCHOLAR"],
    beginnersLuck: "WILL",
    uses: "learning spells for elves and magicians, knowing about magical things, Banish/Abjure and Riddle conflicts",
  },
  MANIPULATOR: {
    description: "A manipulator uses lies, half-truths, ugly truth, soothing platitudes, seduction and intimidation to get what he wants.",
    suggestedHelp: ["PERSUADER"],
    beginnersLuck: "WILL",
    uses: "Riddling, Convince, and Convince Crowd conflicts.",
  },
  MENTOR: {
    description: "A mentor knows how to transmit skills to another character. Using this skill, you can give your student a test for advancement in a skill or teach a spell in camp or town. In order to teach, the mentor must have the skill being taught at a higher rating than the student. The skill being taught may be used by a third character to help. The student doesn’t help.",
    beginnersLuck: "WILL",
    uses: "helping others learn skills or spells",
  },
  ORATOR: {
    description: "An orator uses poetry, performances and speeches to sway crowds. This skill isn’t for convincing your friend, it is for influencing a crowd.",
    supplies: "Orators can benefit from speeches written by scholars and theologians, or harps built by carpenters.",
    suggestedHelp: ["MANIPULATOR"],
    beginnersLuck: "WILL",
    uses: "Convince Crowd conflicts",
  },
  PATHFINDER: {
    description: "A pathfinder blazes trails through wilderness from town to town, and finds trails to lesser-known features like streams, springs, cave mouths, ruins or fields of herbs.",
    supplies: "Pathfinders can use maps from cartographers as supplies.",
    suggestedHelp: ["SCOUT", "HUNTER"],
    beginnersLuck: "HEALTH",
  },
  PEASANT: {
    description: "Peasants are the backbone of civilized society. They dig ditches, mend fences and raise livestock.",
    suggestedHelp: ["LABORER", "SURVIVALIST"],
    beginnersLuck: "HEALTH",
  },
  PERSUADER: {
    description: "Persuaders explain to their friends why it’s in their best interest to act on their behalf. This skill is not for speech-making, lying or manipulating. Use it in small friendly(ish) conversations.",
    suggestedHelp: ["MANIPULATOR"],
    beginnersLuck: "WILL",
    uses: "Convince conflicts",
  },
  RIDER: {
    description: "Knights, horse archers and goblin wolf-riders use this skill to ride and care for horses and more exotic riding beasts.",
    supplies: "Riders use bits and spurs from smiths, saddles and bridles from tanners or saddle blankets from weavers as tools and supplies.",
    suggestedHelp: ["PEASANT"],
    beginnersLuck: "HEALTH",
    uses: "Pursue/Flee conflicts, may augment your Might and assist in combat",
  },
  RITUALIST: {
    description: "Ritualists use prayers and chants to draw upon the power of the Immortal Lords and other primal forces to impose their will upon the world. It is the exclusive domain of clerics and creatures that know the secrets of beseeching the Immortal Lords. Use Ritualist to invoke cleric prayers.",
    supplies: "Ritualists can use supplies from many professions. See individual prayers for details.",
    suggestedHelp: ["RITUALIST"],
    beginnersLuck: "WILL",
    uses: "casting prayers, Abjure/Banish conflicts",
  },
  SAILOR: {
    description: "A sailor can use his knowledge to navigate a vessel along coasts and waterways.",
    suggestedHelp: ["LABORER", "PATHFINDER", "SURVIVALIST"],
    beginnersLuck: "HEALTH",
  },
  SCAVENGER: {
    description: "A scavenger can find useful materials and forage for sustenance anywhere in the wild.",
    suggestedHelp: ["SCAVENGER", "SCOUT"],
    beginnersLuck: "HEALTH",
    uses: "foraging for food, finding useful materials or scrap",
  },
  SCHOLAR: {
    description: "A scholar specializes in writing accounts of events for historical records. They are also adept at plumbing the depths of archives or libraries for information. This skill is highly prized by magicians to maintain their spell books and scrolls.",
    supplies: "Scholars can be supplied with paper from millers and ink from alchemists.",
    suggestedHelp: ["LORE_MASTER", "STEWARD"],
    beginnersLuck: "WILL",
    uses: "researching in town, scribing scrolls and spellbooks, knowing about non-magical topics",
  },
  SCOUT: {
    description: "A scout is adept at spotting and tracking monsters on the prowl, sneaking behind enemy lines, trailing targets and finding hidden things. When out on patrol, scouts also excel at moving undetected. Scout is not used to find trails or navigate dungeon features. For those obstacles, use Pathfinder and Dungeoneer respectively.",
    suggestedHelp: ["PATHFINDER", "HUNTER"],
    beginnersLuck: "WILL",
    uses: "spotting traps, moving around stealthily, Pursue/Flee conflicts",
  },
  STEWARD: {
    description: "A steward manages estates, businesses, towns, cities, baronies and kingdoms. This skill is used by judges, stewards, guildmasters, merchants, spymasters, abbots, bishops, and powerful lords and ladies to oversee an organization or its rules and laws. Use this skill to write laws, account for taxes, rents and tithes, allocate funds for projects, file reports and distribute resources.",
    supplies: "Stewards can use supplies in the form of records and documents from scholars.",
    suggestedHelp: ["SCHOLAR", "ORATOR", "THEOLOGIAN"],
    beginnersLuck: "WILL",
  },
  STONEMASON: {
    description: "Stonemasons cut stone and use it to make walls, bridges, arches and buildings.",
    supplies: "Stonemasons are always in need of good tools from smiths to make their work easier.",
    suggestedHelp: ["LABORER"],
    beginnersLuck: "HEALTH",
    uses: "clearing rubble, breaking down or shoring up dungeon architecture",
  },
  SURVIVALIST: {
    description: "Competent survivalists know how to make shelters, find water, build fires and jury-rig tools. A survivalist can also read the weather and judge when it will be safe to travel and when to wait it out.",
    suggestedHelp: ["HUNTER"],
    beginnersLuck: "HEALTH",
    uses: "locating a water source, jury-rigging tools and torches, finding a more secure campsite",
  },
  THEOLOGIAN: {
    description: "Theologians are masters of doctrine and the secrets of the Immortal Lords. They know the cosmology of the heavens and the hells, the ranks of the angels and demons, and even their hidden names.",
    supplies: "Theologians may use records and holy books from scholars.",
    suggestedHelp: ["SCHOLAR"],
    beginnersLuck: "WILL",
    uses: "Banish/Abjure conflicts, preparing prayers, knowing about religious doctrines and supernatural beings",
  },
  WEAVER: {
    description: "A weaver can manufacture fabric and create cloaks, aprons, blankets, rope, cordage, sheets and tapestries.",
    supplies: "Weavers can take fur from hunters, fibers from farmers or wool from herders. Dyes come from stonemasons, scavengers or alchemists.",
    suggestedHelp: ["WEAVER"],
    beginnersLuck: "WILL",
    uses: "The products of a weaver can be used as supplies to recover from conditions gained from being cold and wet, and many other tests.",
  },
}
