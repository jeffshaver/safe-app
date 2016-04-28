/* globals describe, it */

import expect from 'expect'
import {
  default as reducer,
  RESET,
  resetUploadDataTypes,
  SET,
  SET_BY_HEADER_NAME,
  setUploadDataTypeByHeaderName,
  setUploadDataTypes
} from '../../src/js/modules/upload-data-types'

describe('upload-data-types actions', () => {
  it('setUploadDataTypes creates SET action', () => {
    const uploadDataTypes = {
      columnName1: 'type1',
      columnName2: 'type2'
    }

    const expectedAction = {
      payload: {uploadDataTypes},
      type: SET
    }

    expect(setUploadDataTypes(uploadDataTypes)).toEqual(expectedAction)
  })

  it('setUploadDataTypeByHeaderName creates SET_BY_HEADER_NAME action', () => {
    const header = 'header'
    const value = 'value'

    const expectedAction = {
      payload: {header, value},
      type: SET_BY_HEADER_NAME
    }

    expect(setUploadDataTypeByHeaderName(header, value)).toEqual(expectedAction)
  })

  it('resetUploadDataTypes creates a RESET action', () => {
    const expectedAction = {
      type: RESET
    }

    expect(resetUploadDataTypes()).toEqual(expectedAction)
  })
})

describe('upload-data-types reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {}

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle SET', () => {
    const uploadDataTypes = {
      columnName1: 'type1',
      columnName2: 'type2'
    }
    const action = {
      payload: {uploadDataTypes},
      type: SET
    }
    const result = reducer(undefined, action)
    const stateAfter = uploadDataTypes

    expect(result).toEqual(stateAfter)
  })

  it('should handle SET_BY_HEADER_NAME', () => {
    const stateBefore = {
      columnName1: 'type1',
      columnName2: 'type2'
    }
    const stateAfter = {
      columnName1: 'type1',
      columnName2: 'type3'
    }
    const action = {
      payload: {header: 'columnName2', value: 'type3'},
      type: SET_BY_HEADER_NAME
    }

    const result = reducer(stateBefore, action)

    expect(result).toEqual(stateAfter)
  })

  it('should handle RESET', () => {
    const stateBefore = {
      columnName1: 'type1',
      columnName2: 'type2'
    }
    const action = {
      type: RESET
    }

    const result = reducer(stateBefore, action)

    expect(result).toEqual({})
  })
})
