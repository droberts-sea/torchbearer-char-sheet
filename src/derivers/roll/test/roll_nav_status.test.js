import _ from 'underscore';

import rollNavStatus from '../roll_nav_status';

import { ROLL_PAGES } from '../../../actions/roll_actions';
import { ROLL_STAGES } from '../../../reducers/roll/roll_reducer';

import mockRoll from '../../../mock/roll';


describe('rollNavStatus', () => {
  let roll;
  beforeEach(() => {
    roll = JSON.parse(JSON.stringify(mockRoll));
  });

  it('runs without crashing', () => {
    rollNavStatus(roll);
  });

  it('tracks page index and page name', () => {
    _.times(ROLL_PAGES.length, (n) => {
      roll.pageIndex = n;
      const navStatus = rollNavStatus(roll);
      expect(navStatus.pageIndex).toEqual(n);
      expect(navStatus.pageName).toEqual(ROLL_PAGES[n]);
    });
  });

  it('points to correct prev and next pages', () => {
    _.times(ROLL_PAGES.length, (n) => {
      roll.pageIndex = n;
      const navStatus = rollNavStatus(roll);
      expect(navStatus.back.target).toEqual(n - 1);
      expect(navStatus.forward.target).toEqual(n + 1);
    });
  });

  it('disables the back button on page 0', () => {
    roll.pageIndex = 0;
    const navStatus = rollNavStatus(roll);
    expect(navStatus.back.disabled).toBeTruthy();
  });

  it('disables the forward button from the READY page in the PRE_ROLL stage', () => {
    roll.pageIndex = ROLL_PAGES.indexOf('READY');
    roll.stage = ROLL_STAGES.PRE_ROLL;

    const navStatus = rollNavStatus(roll);
    expect(navStatus.forward.disabled).toBeTruthy();
  });

  it('enables the forward button from the READY page in the REACT and OUTCOME stages', () => {
    roll.pageIndex = ROLL_PAGES.indexOf('READY');

    roll.stage = ROLL_STAGES.REACT;
    let navStatus = rollNavStatus(roll);
    expect(navStatus.forward.disabled).toBeFalsy();

    roll.stage = ROLL_STAGES.OUTCOME;
    navStatus = rollNavStatus(roll);
    expect(navStatus.forward.disabled).toBeFalsy();
  });

  it('disables the forward button from the REACT page in the REACT stage', () => {
    roll.pageIndex = ROLL_PAGES.indexOf('REACT');
    roll.stage = ROLL_STAGES.REACT;

    const navStatus = rollNavStatus(roll);
    expect(navStatus.forward.disabled).toBeTruthy();
  });

  it('enables the forward button from the REACT page in the OUTCOME stage', () => {
    roll.pageIndex = ROLL_PAGES.indexOf('REACT');
    roll.stage = ROLL_STAGES.OUTCOME;

    const navStatus = rollNavStatus(roll);
    expect(navStatus.forward.disabled).toBeFalsy();
  });

  it('disables the forward button from the OUTCOME page', () => {
    roll.pageIndex = ROLL_PAGES.indexOf('OUTCOME');
    roll.stage = ROLL_STAGES.OUTCOME;

    const navStatus = rollNavStatus(roll);
    expect(navStatus.forward.disabled).toBeTruthy();
  });
});