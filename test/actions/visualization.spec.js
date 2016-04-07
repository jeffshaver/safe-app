/* globals describe, it */

import expect from 'expect'
import {
  SET_VISUALIZATION
} from '../../src/js/action-types'
import {
  setVisualization
} from '../../src/js/actions'

describe('visualization actions', () => {
  it('setVisualization should create an SET_VISUALIZATION action', () => {
    const visualization = 'VisualizationA'
    const expectedAction = {
      type: SET_VISUALIZATION,
      payload: {visualization}
    }

    expect(setVisualization(visualization)).toEqual(expectedAction)
  })
})