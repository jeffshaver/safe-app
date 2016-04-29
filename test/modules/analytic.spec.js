/* globals describe, it */

import expect from 'expect'
import {
  HYDRATE,
  hydrateAnalytic,
  default as reducer,
  SET,
  setAnalytic
} from '../../src/js/modules/analytic'

describe('analytic actions', () => {
  it('hydrateAnalytic should create a HYDRATE action', () => {
    const analytic = 'AnalyticA'
    const expectedAction = {
      state: analytic,
      type: HYDRATE
    }

    expect(hydrateAnalytic(analytic)).toEqual(expectedAction)
  })

  it('setAnalytic should create an SET action', () => {
    const analytic = 'AnalyticA'
    const expectedAction = {
      payload: {analytic},
      type: SET
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
      payload: {analytic: stateAfter},
      type: SET
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })
})