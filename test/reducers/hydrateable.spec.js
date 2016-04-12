/* globals describe, it */

/*
 * Note that this assumes the analytic reducer is working correctly
 */

import expect from 'expect'
import {
  HYDRATE_ANALYTIC,
  SET_ANALYTIC
} from '../../src/js/action-types'
import {
  analytic as analyticReducer,
  hydrateable
} from '../../src/js/reducers'

const reducer = hydrateable(analyticReducer, HYDRATE_ANALYTIC)

describe('hydrateable reducer', () => {
  it('should run the regular reducer if action is not hyrate', () => {
    const stateAfter = 'AnalyticA'
    const action = {
      type: SET_ANALYTIC,
      payload: {analytic: stateAfter}
    }

    expect(reducer(analyticReducer, action)).toEqual(stateAfter)
  })

  it('should run the regular reducer with state instead of payload if the action is hydrate', () => {
    const stateAfter = 'AnalyticA'
    const action = {
      type: HYDRATE_ANALYTIC,
      state: stateAfter
    }

    expect(reducer(analyticReducer, action)).toEqual(stateAfter)
  })
})