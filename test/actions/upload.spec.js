/* globals describe, it */

import expect from 'expect'
import {
  RESET_UPLOAD_DATA_TYPES,
  SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME,
  SET_UPLOAD_DATA_TYPES
} from '../../src/js/action-types'
import {
  resetUploadDataTypes,
  setUploadDataTypeByHeaderName,
  setUploadDataTypes
} from '../../src/js/actions'

describe('upload actions', () => {
  it('creates SET_UPLOAD_DATA_TYPES action when data types are set', () => {
    const uploadDataTypes = {
      columnName1: 'type1',
      columnName2: 'type2'
    }

    const expectedAction = {
      payload: {uploadDataTypes},
      type: SET_UPLOAD_DATA_TYPES
    }

    expect(setUploadDataTypes(uploadDataTypes)).toEqual(expectedAction)
  })

  it('creates SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME action when one column is set', () => {
    const header = 'header'
    const value = 'value'

    const expectedAction = {
      payload: {header, value},
      type: SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME
    }

    expect(setUploadDataTypeByHeaderName(header, value)).toEqual(expectedAction)
  })

  it('creates a RESET_UPLOAD_DATA_TYPES action', () => {
    const expectedAction = {
      type: RESET_UPLOAD_DATA_TYPES
    }

    expect(resetUploadDataTypes()).toEqual(expectedAction)
  })
})