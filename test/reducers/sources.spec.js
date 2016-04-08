/* globals describe, it */

import {List, Map} from 'immutable'
import expect from 'expect'
import {
  FETCH_SOURCES_REQUEST,
  FETCH_SOURCES_SUCCESS
} from '../../src/js/action-types'
import {
  sources as reducer
} from '../../src/js/reducers'

describe('sources reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = Map({
      data: List(),
      didInvalidate: false,
      isFetching: false,
      lastUpdated: null
    })

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle FETCH_SOURCES_REQUEST', () => {
    const action = {
      type: FETCH_SOURCES_REQUEST
    }
    const stateAfter = Map({
      data: List(),
      didInvalidate: false,
      isFetching: true,
      lastUpdated: null
    })

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle FETCH_SOURCES_SUCCESS', () => {
    const data = ['SourceA', 'SourceB']
    const action = {
      payload: {data},
      didInvalidate: false,
      isFetching: false,
      recievedAt: Date.now(),
      type: FETCH_SOURCES_SUCCESS
    }
    const result = reducer(undefined, action)
    const expectedValue = Map({
      data: List(data),
      didInvalidate: false,
      isFetching: false,
      lastUpdated: result.get('lastUpdated')
    })

    expect(result).toEqual(expectedValue)
  })
})