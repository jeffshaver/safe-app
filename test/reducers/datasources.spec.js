import expect from 'expect'
import {
  SET_DATA_SOURCES
} from '../../src/js/actionTypes'
import {
  dataSources as reducer
} from '../../src/js/reducers'

describe('dataSources reducer', () => {
  it('should return the initial state', () => {
    const expectedValue = []

    expect(reducer(undefined, {})).toEqual(expectedValue)
  })

  it('should handle SET_DATA_SOURCE', () => {
    const newDataSources = ['DataSourceA', 'DataSourceB']

    expect(reducer(undefined, {
      type: SET_DATA_SOURCES,
      value: newDataSources
    })).toEqual(newDataSources)
  })
})