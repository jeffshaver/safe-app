import expect from 'expect'
import {
  SET_VISUALIZATION
} from '../../src/js/actionTypes'
import {
  visualization as reducer
} from '../../src/js/reducers'

describe('visualization reducer', () => {
  it('should return the initial state', () => {
    const expectedValue = ''

    expect(reducer(undefined, {})).toEqual(expectedValue)
  })

  it('should handle SET_VISUALIZATION', () => {
    const expectedValue = 'VisualizationA'

    expect(reducer(undefined, {
      type: SET_VISUALIZATION,
      value: expectedValue
    })).toEqual(expectedValue)
  })
})