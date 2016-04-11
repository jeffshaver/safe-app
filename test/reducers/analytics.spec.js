/* globals describe, it */

import expect from 'expect'
import {
  FETCH_ANALYTICS_REQUEST,
  FETCH_ANALYTICS_SUCCESS
} from '../../src/js/action-types'
import {
  analytics as reducer
} from '../../src/js/reducers'

describe('analytics reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {
      data: [],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: null
    }

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle FETCH_ANALYTICS_REQUEST', () => {
    const action = {
      type: FETCH_ANALYTICS_REQUEST
    }
    const stateAfter = {
      data: [],
      didInvalidate: false,
      isFetching: true,
      lastUpdated: null
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle FETCH_ANALYTICS_SUCCESS', () => {
    const data = ['AnalyticA', 'AnalyticB']
    const action = {
      data,
      didInvalidate: false,
      isFetching: false,
      type: FETCH_ANALYTICS_SUCCESS
    }
    const result = reducer(undefined, action)
    const expectedValue = {
      data,
      didInvalidate: false,
      isFetching: false,
      lastUpdated: result.lastUpdated
    }

    expect(result).toEqual(expectedValue)
  })
})