[![Build Status](https://travis-ci.org/droberts-ada/torchbearer-char-sheet.svg?branch=master)](https://travis-ci.org/droberts-ada/torchbearer-char-sheet)

# Torchbearer Character Sheet

This project is a work-in-progress! It's partly me trying to solve a problem I have, and partly me messing around with React. My style is still evolving rapidly, so forgive any messiness you might encounter.

## Info for Developers

### Vocab

### App Structure

**Roll Page**

The roll page needs to make a lot of calculations about what the roll will look like, what options are enabled, what are the odds of success, etc. I have called this _derived state_ (that may change later, maybe derived props would be a better term). The functions to make this work live in the `derivers/roll` folder.

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

## Legal stuff

### Dice images

derivative work: PhJDie_Faces.png: Nanami Kamimura [CC BY-SA (https://creativecommons.org/licenses/by-sa/3.0)]