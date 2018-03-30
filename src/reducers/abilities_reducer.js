const Abilities = {
  WILL: 'WILL',
  HEALTH: 'HEALTH',
  NATURE: 'NATURE',
  RESOURCES: 'RESOURCES',
  CIRCLES: 'CIRCLES',
  MIGHT: 'MIGHT'
}

const AbilityCategories = {
  RAW: 'RAW',
  TOWN: 'TOWN',

}

const InitialAbilities = {
  WILL: {
    rating: 5,
    advancement: {
      pass: 0,
      fail: 0
    }
  },
  HEALTH: {
    rating: 3,
    advancement: {
      pass: 0,
      fail: 0
    }
  },
  NATURE: {
    rating: 3,
    untaxed: 5,
    advancement: {
      pass: 0,
      fail: 0
    },
    descriptors: ['Sneaking', 'Riddling', 'Merrymaking']
  },
  RESOURCES: {
    rating: 3,
    advancement: {
      pass: 0,
      fail: 0
    }
  },
  CIRCLES: {
    rating: 4,
    advancement: {
      pass: 0,
      fail: 0
    }
  },
  MIGHT: {
    rating: 3
  }
}

const abilitiesReducer = function(state=InitialAbilities, action) {
  switch (action.type) {
    case MARK_TEST:
    console.log('TODO: implement tests');
    // if action.payload.name in state.keys, do something
    break;

    case TAX:
    console.log('TODO: implement tax');
    return state;
    break;

    default:
    return state;
  }
}
