/* global describe, it */

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
    const stateAfter = {
      data: [],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: null
    }

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle REQUEST_DATA_SOURCE_FIELDS', () => {
    const action = {
      type: FETCH_SOURCE_FIELDS_REQUEST
    }
    const stateAfter = {
      data: [],
      didInvalidate: false,
      isFetching: true,
      lastUpdated: null
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle FETCH_SOURCE_FIELDS_SUCCESS', () => {
    const data = ['SourceFieldA', 'SourceFieldB']
    const action = {
      data,
      didInvalidate: false,
      isFetching: false,
      type: FETCH_SOURCE_FIELDS_SUCCESS
    }
    const result = reducer(undefined, action)
    const stateAfter = {
      data,
      didInvalidate: false,
      isFetching: false,
      lastUpdated: result.lastUpdated
    }

    expect(result).toEqual(stateAfter)
  })
})