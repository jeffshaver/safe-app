/* globals describe, it */

import expect from 'expect'
import {
  CLEAR_UPLOAD_DATA_TYPES,
  SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME,
  SET_UPLOAD_DATA_TYPES
} from '../../src/js/actionTypes'
import {
  clearUploadDataTypes,
  setUploadDataTypeByHeaderName,
  setUploadDataTypes
} from '../../src/js/actions'

describe('upload actions', () => {
  it('creates SET_UPLOAD_DATA_TYPES action when data types are set', () => {
    const dataTypes = {
      columnName1: 'type1',
      columnName2: 'type2'
    }

    const expectedAction = {
      payload: dataTypes,
      type: SET_UPLOAD_DATA_TYPES
    }

    expect(setUploadDataTypes(dataTypes)).toEqual(expectedAction)
  })

  it('creates SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME action when one column is set', () => {
    const payload = {
      header: 'value'
    }

    const expectedAction = {
      payload,
      type: SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME
    }

    expect(setUploadDataTypeByHeaderName(payload)).toEqual(expectedAction)
  })
  
  it('creates a CLEAR_UPLOAD_DATA_TYPES action', () => {
    const expectedAction = {
      type: CLEAR_UPLOAD_DATA_TYPES
    }
    
    expect(clearUploadDataTypes()).toEqual(expectedAction)
  })
})
