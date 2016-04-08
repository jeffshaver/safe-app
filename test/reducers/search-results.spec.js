/* global describe, it */

import {fromJS, List, Map} from 'immutable'
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
    const stateAfter = Map({
      data: List(),
      didInvalidate: false,
      isFetching: false,
      lastUpdated: null
    })

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle FETCH_SEARCH_RESULTS_REQUEST', () => {
    const action = {
      type: FETCH_SEARCH_RESULTS_REQUEST
    }
    const stateAfter = Map({
      data: List(),
      didInvalidate: false,
      isFetching: true,
      lastUpdated: null
    })

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle FETCH_SEARCH_RESULTS_SUCCESS', () => {
    const data = [{
      _id: 1,
      name: 'John',
      age: 25,
      county: 'Howard'
    }, {
      _id: 4,
      name: 'Bob',
      age: 40,
      county: 'Howard'
    }]
    const action = {
      payload: {data},
      didInvalidate: false,
      isFetching: false,
      recievedAt: Date.now(),
      type: FETCH_SEARCH_RESULTS_SUCCESS
    }
    const result = reducer(undefined, action)
    const stateAfter = Map({
      data: fromJS(data),
      didInvalidate: false,
      isFetching: false,
      lastUpdated: result.get('lastUpdated')
    })

    expect(result).toEqual(stateAfter)
  })
})