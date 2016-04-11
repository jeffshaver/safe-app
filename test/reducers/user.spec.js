/* globals describe, it */

import expect from 'expect'
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS
} from '../../src/js/action-types'
import {
  user as reducer
} from '../../src/js/reducers'

describe('user reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {
      data: {},
      didInvalidate: false,
      isFetching: false,
      lastUpdated: null
    }

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle FETCH_USER_REQUEST', () => {
    const action = {
      type: FETCH_USER_REQUEST
    }
    const stateAfter = {
      data: {},
      didInvalidate: false,
      isFetching: true,
      lastUpdated: null
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle FETCH_USER_SUCCESS', () => {
    const data = {authenticated: true, username: 'unknown'}
    const action = {
      data,
      didInvalidate: false,
      isFetching: false,
      type: FETCH_USER_SUCCESS
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