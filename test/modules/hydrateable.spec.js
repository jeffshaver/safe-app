/* globals describe, it */

/*
 * Note that this assumes the analytic reducer is working correctly
 */

import expect from 'expect'
import {default as hydrateable} from '../../src/js/modules/hydrateable'
import {
  default as analyticReducer,
  HYDRATE,
  SET
} from '../../src/js/modules/analytic'

const reducer = hydrateable(analyticReducer, HYDRATE)

describe('hydrateable reducer', () => {
  it('should run the regular reducer if action is not hyrate', () => {
    const stateAfter = 'AnalyticA'
    const action = {
      type: SET,
      payload: {analytic: stateAfter}
    }

    expect(reducer(analyticReducer, action)).toEqual(stateAfter)
  })

  it('should run the regular reducer with state instead of payload if the action is hydrate', () => {
    const stateAfter = 'AnalyticA'
    const action = {
      type: HYDRATE,
      state: stateAfter
    }

    expect(reducer(analyticReducer, action)).toEqual(stateAfter)
  })
})