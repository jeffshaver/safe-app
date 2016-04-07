/* globals describe, it */

import expect from 'expect'
import {
  SET_ANALYTIC
} from '../../src/js/action-types'
import {
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
})