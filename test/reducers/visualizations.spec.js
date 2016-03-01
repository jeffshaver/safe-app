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
    const expectedValue = {
      data: [],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: null
    }

    expect(reducer(undefined, {})).toEqual(expectedValue)
  })

  it('should handle FETCH_VISUALIZATIONS_REQUEST', () => {
    const expectedValue = {
      data: [],
      didInvalidate: false,
      isFetching: true,
      lastUpdated: null
    }

    expect(reducer(undefined, {
      type: FETCH_VISUALIZATIONS_REQUEST
    })).toEqual(expectedValue)
  })

  it('should handle FETCH_VISUALIZATIONS_SUCCESS', () => {
    const newVisualizations = ['VisualizationA', 'VisualizationB']
    const actualValue = reducer(undefined, {
      data: newVisualizations,
      didInvalidate: false,
      isFetching: false,
      type: FETCH_VISUALIZATIONS_SUCCESS
    })
    const expectedValue = {
      data: newVisualizations,
      didInvalidate: false,
      isFetching: false,
      lastUpdated: actualValue.lastUpdated
    }

    expect(actualValue).toEqual(expectedValue)
  })
})