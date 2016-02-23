import expect from 'expect'
import {
  SET_DATA_SOURCE
} from '../../src/js/actionTypes'
import {
  dataSource as reducer
} from '../../src/js/reducers'

describe('dataSource reducer', () => {
  it('should return the initial state', () => {
    const expectedValue = ''

    expect(reducer(undefined, {})).toEqual(expectedValue)
  })

  it('should handle SET_DATA_SOURCE', () => {
    const newDataSource = 'DataSourceA'

    expect(reducer(undefined, {
      type: SET_DATA_SOURCE,
      value: newDataSource
    })).toEqual(newDataSource)
  })
})