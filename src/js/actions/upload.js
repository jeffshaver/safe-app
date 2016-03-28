import {
  CLEAR_UPLOAD_DATA_TYPES,
  SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME,
  SET_UPLOAD_DATA_TYPES
} from '../actionTypes'

export const clearUploadDataTypes = () => ({
  type: CLEAR_UPLOAD_DATA_TYPES
})

export const setUploadDataTypeByHeaderName = (payload) => ({
  type: SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME,
  payload
})

export const setUploadDataTypes = (payload) => ({
  type: SET_UPLOAD_DATA_TYPES,
  payload
})
