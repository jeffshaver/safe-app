/* globals describe, it */

import expect from 'expect'
import {
  HYDRATE_VISUALIZATION,
  SET_VISUALIZATION
} from '../../src/js/action-types'
import {
  hydrateVisualization,
  setVisualization
} from '../../src/js/actions'

describe('visualization actions', () => {
  it('hydrateVisualization should create a HYDRATE_VISUALIZATION action', () => {
    const visualization = 'VisualizationA'
    const expectedAction = {
      type: HYDRATE_VISUALIZATION,
      state: visualization
    }

    expect(hydrateVisualization(visualization)).toEqual(expectedAction)
  })

  it('setVisualization should create an SET_VISUALIZATION action', () => {
    const visualization = 'VisualizationA'
    const expectedAction = {
      type: SET_VISUALIZATION,
      payload: {visualization}
    }

    expect(setVisualization(visualization)).toEqual(expectedAction)
  })
})