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
    name: 'Will',
    rating: 5,
    advancement: {
      pass: 0,
      fail: 0
    }
  },
  HEALTH: {
    name: 'Health',
    rating: 3,
    advancement: {
      pass: 0,
      fail: 0
    }
  },
  NATURE: {
    name: 'Nature',
    rating: 3,
    untaxed: 5,
    advancement: {
      pass: 0,
      fail: 0
    },
    descriptors: ['Sneaking', 'Riddling', 'Merrymaking']
  },
  RESOURCES: {
    name: 'Resources',
    rating: 3,
    advancement: {
      pass: 0,
      fail: 0
    }
  },
  CIRCLES: {
    name: 'Circles',
    rating: 4,
    advancement: {
      pass: 0,
      fail: 0
    }
  },
  MIGHT: {
    name: 'Might',
    rating: 3
  }
}

const abilitiesReducer = function(state=InitialAbilities, action) {
  switch (action.type) {
    // case MARK_TEST:
    // console.log('TODO: implement tests');
    // // if action.payload.name in state.keys, do something
    // break;
    //
    // case TAX:
    // console.log('TODO: implement tax');
    // return state;
    // break;

    default:
    return state;
  }
}

export default abilitiesReducer;
