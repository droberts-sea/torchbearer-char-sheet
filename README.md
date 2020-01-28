[![Build Status](https://travis-ci.org/droberts-ada/torchbearer-char-sheet.svg?branch=master)](https://travis-ci.org/droberts-ada/torchbearer-char-sheet)

# Torchbearer Character Sheet

This project is a work-in-progress! It's partly me trying to solve a problem I have, and partly me messing around with React. My style is still evolving rapidly, so forgive any messiness you might encounter.

## Info for Developers

### Vocab

### App Structure

**Roll Page**

The roll page has two types of state. The first is the state provided by the user: toggled options describing how the roll should proceed. The second is called _derived state_, and describes what the roll will look like. Based on what we know about the character and what the user has told us about the roll, how many dice do we get, what are the odds of success, etc.

### Current Work

### Wishlist

**Functionality**

Roughly in order of importance

_MVP_

- Roll page (half finished)
  - Dice math for opposed rolls
  - Actually do the roll
  - React / reroll
  - Feed results back into character sheet after roll
    - Call these "resources"?
  - Cancel button
- Character creation / input
- Edit mode for a character (possibly same as ^^)
- Character saved (local)
- End of session (reset traits, other per-session resources)

_Post-MVP_

- Character saved (cloud)
- Undo / redo (less important with edit mode)
- Bio page
- Gear page
- Session end / start
- Camp
- Town
- Leveling
- Class features
- Multiple characters
- Hamburger menu
  - About
  - Log in
  - Switch characters
  - Join game?
  - Export / import character as JSON
- Join game with others in party
  - Be able to contribute to rolls and have things update
  - GM view?



**Rules**



**UI / UX**

- Swipe left / right to change page
  - Animation for page changes

### Resources

#### Torchbearer

- Reddit - checklist for tests https://www.reddit.com/r/Torchbearer/comments/drng4p/my_checklist_for_tests/
- Burning wheel - dice roll cheat sheet - https://www.torchbearerrpg.com/wp-content/uploads/2016/10/Torchbearer-Cheat-Sheets-Dice-Rolls.pdf

#### Programming Stuff

- If recalculating derived state is too slow, consider using something like https://github.com/reduxjs/reselect