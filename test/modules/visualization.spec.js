/* globals describe, it */

import expect from 'expect'
import {
  HYDRATE,
  hydrateVisualization,
  default as reducer,
  SET,
  setVisualization
} from '../../src/js/modules/visualization'

describe('visualization actions', () => {
  it('hydrateVisualization should create a HYDRATE action', () => {
    const visualization = 'VisualizationA'
    const expectedAction = {
      type: HYDRATE,
      state: visualization
    }

    expect(hydrateVisualization(visualization)).toEqual(expectedAction)
  })

  it('setVisualization should create an SET action', () => {
    const visualization = 'VisualizationA'
    const expectedAction = {
      type: SET,
      payload: {visualization}
    }

    expect(setVisualization(visualization)).toEqual(expectedAction)
  })
})

describe('visualization reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = ''

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle SET', () => {
    const stateAfter = 'VisualizationA'
    const action = {
      type: SET,
      payload: {visualization: stateAfter}
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })
})