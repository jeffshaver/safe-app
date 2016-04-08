/* global describe, it */

import {List, Map} from 'immutable'
import expect from 'expect'
import {
  FETCH_SOURCE_FIELDS_REQUEST,
  FETCH_SOURCE_FIELDS_SUCCESS
} from '../../src/js/action-types'
import {
  fields as reducer
} from '../../src/js/reducers'

describe('fields reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = Map({
      data: List(),
      didInvalidate: false,
      isFetching: false,
      lastUpdated: null
    })

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle REQUEST_DATA_SOURCE_FIELDS', () => {
    const action = {
      type: FETCH_SOURCE_FIELDS_REQUEST
    }
    const stateAfter = Map({
      data: List(),
      didInvalidate: false,
      isFetching: true,
      lastUpdated: null
    })

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle FETCH_SOURCE_FIELDS_SUCCESS', () => {
    const data = ['SourceFieldA', 'SourceFieldB']
    const action = {
      payload: {data},
      didInvalidate: false,
      isFetching: false,
      recievedAt: Date.now(),
      type: FETCH_SOURCE_FIELDS_SUCCESS
    }
    const result = reducer(undefined, action)
    const stateAfter = Map({
      data: List(data),
      didInvalidate: false,
      isFetching: false,
      lastUpdated: result.get('lastUpdated')
    })

    expect(result).toEqual(stateAfter)
  })
})