/* globals describe, it */

import expect from 'expect'
import {
  SET_ANALYTIC
} from '../../src/js/actionTypes'
import {
  setAnalytic
} from '../../src/js/actions'

describe('analytic actions', () => {
  it('setAnalytic should create an SET_ANALYTIC action', () => {
    const source = 'AnalyticA'
    const expectedAction = {
      type: SET_ANALYTIC,
      value: source
    }

    expect(setAnalytic(source)).toEqual(expectedAction)
  })
})