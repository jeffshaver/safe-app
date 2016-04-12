/* globals describe, it */

import expect from 'expect'
import {
  HYDRATE_ANALYTIC,
  SET_ANALYTIC
} from '../../src/js/action-types'
import {
  hydrateAnalytic,
  setAnalytic
} from '../../src/js/actions'

describe('analytic actions', () => {
  it('setAnalytic should create an SET_ANALYTIC action', () => {
    const analytic = 'AnalyticA'
    const expectedAction = {
      type: SET_ANALYTIC,
      payload: {analytic}
    }

    expect(setAnalytic(analytic)).toEqual(expectedAction)
  })

  it('hydrateAnalytic should create a HYDRATE_ANALYTIC action', () => {
    const analytic = 'AnalyticA'
    const expectedAction = {
      type: HYDRATE_ANALYTIC,
      state: analytic
    }

    expect(hydrateAnalytic(analytic)).toEqual(expectedAction)
  })
})