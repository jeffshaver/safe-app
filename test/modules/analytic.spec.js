/* globals describe, it */

import expect from 'expect'
import {
  default as reducer,
  HYDRATE,
  hydrateAnalytic,
  SET,
  setAnalytic
} from '../../src/js/modules/analytic'

describe('analytic actions', () => {
  it('hydrateAnalytic should create a HYDRATE action', () => {
    const analytic = 'AnalyticA'
    const expectedAction = {
      type: HYDRATE,
      state: analytic
    }

    expect(hydrateAnalytic(analytic)).toEqual(expectedAction)
  })

  it('setAnalytic should create an SET action', () => {
    const analytic = 'AnalyticA'
    const expectedAction = {
      type: SET,
      payload: {analytic}
    }

    expect(setAnalytic(analytic)).toEqual(expectedAction)
  })
})

describe('analytic reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = ''

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle SET', () => {
    const stateAfter = 'AnalyticA'
    const action = {
      type: SET,
      payload: {analytic: stateAfter}
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })
})