/* globals describe, it */

import expect from 'expect'
import {
  SET_ANALYTIC
} from '../../src/js/actionTypes'
import {
  analytic as reducer
} from '../../src/js/reducers'

describe('analytic reducer', () => {
  it('should return the initial state', () => {
    const expectedValue = ''

    expect(reducer(undefined, {})).toEqual(expectedValue)
  })

  it('should handle SET_ANALYTIC', () => {
    const expectedValue = 'AnalyticA'

    expect(reducer(undefined, {
      type: SET_ANALYTIC,
      value: expectedValue
    })).toEqual(expectedValue)
  })
})