/* global describe, it */

import expect from 'expect'
import {
  FETCH_SOURCE_FIELDS_REQUEST,
  FETCH_SOURCE_FIELDS_SUCCESS
} from '../../src/js/actionTypes'
import {
  fields as reducer
} from '../../src/js/reducers'

describe('fields reducer', () => {
  it('should return the initial state', () => {
    const expectedValue = {
      data: [],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: null
    }

    expect(reducer(undefined, {})).toEqual(expectedValue)
  })

  it('should handle REQUEST_DATA_SOURCE_FIELDS', () => {
    const expectedValue = {
      data: [],
      didInvalidate: false,
      isFetching: true,
      lastUpdated: null
    }

    expect(reducer(undefined, {
      type: FETCH_SOURCE_FIELDS_REQUEST
    })).toEqual(expectedValue)
  })

  it('should handle FETCH_SOURCE_FIELDS_SUCCESS', () => {
    const newDataSourceFields = ['DataSourceFieldA', 'DataSourceFieldB']
    const actualValue = reducer(undefined, {
      data: newDataSourceFields,
      didInvalidate: false,
      isFetching: false,
      type: FETCH_SOURCE_FIELDS_SUCCESS
    })
    const expectedValue = {
      data: newDataSourceFields,
      didInvalidate: false,
      isFetching: false,
      lastUpdated: actualValue.lastUpdated
    }

    expect(actualValue).toEqual(expectedValue)
  })
})