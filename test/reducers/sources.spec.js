import expect from 'expect'
import {
  FETCH_SOURCES_REQUEST,
  FETCH_SOURCES_SUCCESS
} from '../../src/js/actionTypes'
import {
  sources as reducer
} from '../../src/js/reducers'

describe('sources reducer', () => {
  it('should return the initial state', () => {
    const expectedValue = {
      data: [],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: null
    }

    expect(reducer(undefined, {})).toEqual(expectedValue)
  })

  it('should handle FETCH_SOURCES_REQUEST', () => {
    const expectedValue = {
      data: [],
      didInvalidate: false,
      isFetching: true,
      lastUpdated: null
    }

    expect(reducer(undefined, {
      type: FETCH_SOURCES_REQUEST
    })).toEqual(expectedValue)
  })

  it('should handle FETCH_SOURCES_SUCCESS', () => {
    const date = Date.now()
    const newDataSources = ['DataSourceA', 'DataSourceB']
    const expectedValue = {
      data: newDataSources,
      didInvalidate: false,
      isFetching: false,
      lastUpdated: date
    }

    expect(reducer(undefined, {
      data: newDataSources,
      didInvalidate: false,
      isFetching: false,
      lastUpdated: date,
      type: FETCH_SOURCES_REQUEST,
    }))
  })
})