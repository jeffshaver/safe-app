/* globals describe, it */
import expect from 'expect'
import {
  FETCH_ANALYTICS_REQUEST,
  FETCH_ANALYTICS_SUCCESS
} from '../../src/js/actionTypes'
import {
  analytics as reducer
} from '../../src/js/reducers'

describe('analytics reducer', () => {
  it('should return the initial state', () => {
    const expectedValue = {
      data: [],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: null
    }

    expect(reducer(undefined, {})).toEqual(expectedValue)
  })

  it('should handle FETCH_ANALYTICS_REQUEST', () => {
    const expectedValue = {
      data: [],
      didInvalidate: false,
      isFetching: true,
      lastUpdated: null
    }

    expect(reducer(undefined, {
      type: FETCH_ANALYTICS_REQUEST
    })).toEqual(expectedValue)
  })

  it('should handle FETCH_ANALYTICS_SUCCESS', () => {
    const newAnalytics = ['AnalyticA', 'AnalyticB']
    const actualValue = reducer(undefined, {
      data: newAnalytics,
      didInvalidate: false,
      isFetching: false,
      type: FETCH_ANALYTICS_SUCCESS
    })
    const expectedValue = {
      data: newAnalytics,
      didInvalidate: false,
      isFetching: false,
      lastUpdated: actualValue.lastUpdated
    }

    expect(actualValue).toEqual(expectedValue)
  })
})