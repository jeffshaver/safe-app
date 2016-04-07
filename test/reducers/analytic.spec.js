/* globals describe, it */

import expect from 'expect'
import {
  SET_ANALYTIC
} from '../../src/js/action-types'
import {
  analytic as reducer
} from '../../src/js/reducers'

describe('analytic reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = ''

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle SET_ANALYTIC', () => {
    const stateAfter = 'AnalyticA'
    const action = {
      type: SET_ANALYTIC,
      payload: {analytic: stateAfter}
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })
})