import expect from 'expect'
import {
  SET_DATA_SOURCE
} from '../../src/js/actionTypes'
import {
  setDataSource
} from '../../src/js/actions'

describe('datasource actions', () =>{
  it('setDataSource should create an SET_DATA_SOURCE action', () => {
    const dataSource = 'DataSourceA'
    const expectedAction = {
      type: SET_DATA_SOURCE,
      value: dataSource
    }

    expect(setDataSource(dataSource)).toEqual(expectedAction)
  })
})