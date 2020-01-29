import { InitialRoll } from '../reducers/roll/roll_reducer';
import { InitialResults } from '../reducers/roll/results_reducer';

const roll = InitialRoll;
roll.results = JSON.parse(JSON.stringify(InitialResults));
roll.results.rolledDice = [{"id":0,"face":2,"rerolled":false},{"id":1,"face":6,"rerolled":false},{"id":2,"face":6,"rerolled":false},{"id":3,"face":2,"rerolled":false},{"id":4,"face":4,"rerolled":false},{"id":5,"face":5,"rerolled":false},{"id":6,"face":5,"rerolled":false},{"id":7,"face":2,"rerolled":false},{"id":8,"face":1,"rerolled":false}];

export default Object.freeze(roll);