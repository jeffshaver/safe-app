/* globals describe, it */

import expect from 'expect'
import {
  FETCH_VISUALIZATIONS_REQUEST,
  FETCH_VISUALIZATIONS_SUCCESS
} from '../../src/js/actionTypes'
import {
  visualizations as reducer
} from '../../src/js/reducers'

describe('visualizations reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {
      data: [],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: null
    }

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle FETCH_VISUALIZATIONS_REQUEST', () => {
    const action = {
      type: FETCH_VISUALIZATIONS_REQUEST
    }
    const stateAfter = {
      data: [],
      didInvalidate: false,
      isFetching: true,
      lastUpdated: null
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle FETCH_VISUALIZATIONS_SUCCESS', () => {
    const data = ['VisualizationA', 'VisualizationB']
    const action = {
      data,
      didInvalidate: false,
      isFetching: false,
      type: FETCH_VISUALIZATIONS_SUCCESS
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