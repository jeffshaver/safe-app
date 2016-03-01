/* globals describe, it */

import expect from 'expect'
import {
  SET_VISUALIZATION
} from '../../src/js/actionTypes'
import {
  setVisualization
} from '../../src/js/actions'

describe('visualization actions', () => {
  it('setVisualization should create an SET_VISUALIZATION action', () => {
    const source = 'AnalyticA'
    const expectedAction = {
      type: SET_VISUALIZATION,
      value: source
    }

    expect(setVisualization(source)).toEqual(expectedAction)
  })
})