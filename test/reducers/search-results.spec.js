/* global describe, it */

import expect from 'expect'
import {
  FETCH_SEARCH_RESULTS_REQUEST,
  FETCH_SEARCH_RESULTS_SUCCESS
} from '../../src/js/action-types'
import {
  searchResults as reducer
} from '../../src/js/reducers'

describe('searchResults reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {
      data: [],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: null
    }

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle FETCH_SEARCH_RESULTS_REQUEST', () => {
    const action = {
      type: FETCH_SEARCH_RESULTS_REQUEST
    }
    const stateAfter = {
      data: [],
      didInvalidate: false,
      isFetching: true,
      lastUpdated: null
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle FETCH_SEARCH_RESULTS_SUCCESS', () => {
    const data = [{_id: 1, name: 'John', age: 25, county: 'Howard'},
                  {_id: 4, name: 'Bob', age: 40, county: 'Howard'}
                 ]
    const action = {
      data,
      didInvalidate: false,
      isFetching: false,
      type: FETCH_SEARCH_RESULTS_SUCCESS
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