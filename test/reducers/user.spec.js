/* globals describe, it */

import {Map} from 'immutable'
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
    const stateAfter = Map({
      data: Map(),
      didInvalidate: false,
      isFetching: false,
      lastUpdated: null
    })

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle FETCH_USER_REQUEST', () => {
    const action = {
      type: FETCH_USER_REQUEST
    }
    const stateAfter = Map({
      data: Map(),
      didInvalidate: false,
      isFetching: true,
      lastUpdated: null
    })

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle FETCH_USER_SUCCESS', () => {
    const data = {authenticated: true, username: 'unknown'}
    const action = {
      payload: {data},
      didInvalidate: false,
      isFetching: false,
      recievedAt: Date.now(),
      type: FETCH_USER_SUCCESS

    }
    const result = reducer(undefined, action)
    const expectedValue = Map({
      data: Map(data),
      didInvalidate: false,
      isFetching: false,
      lastUpdated: result.get('lastUpdated')
    })

    expect(result).toEqual(expectedValue)
  })
})