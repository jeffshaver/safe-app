import expect from 'expect'
import {
  SET_DATA_SOURCES
} from '../../src/js/actionTypes'
import {
  setDataSources
} from '../../src/js/actions'

describe('datasources actions', () =>{
  it('setDataSources should create an SET_DATA_SOURCES action', () => {
    const dataSources = [
      'DataSourceA',
      'DataSourceB'
    ]
    const expectedAction ={
      type: SET_DATA_SOURCES,
      value: dataSources
    }

    expect(setDataSources(dataSources)).toEqual(expectedAction)
  })
})