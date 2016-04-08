import {
  RESET_UPLOAD_DATA_TYPES,
  SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME,
  SET_UPLOAD_DATA_TYPES
} from '../action-types'

export const resetUploadDataTypes = () => ({
  type: RESET_UPLOAD_DATA_TYPES
})

export const setUploadDataTypeByHeaderName = (header, value) => ({
  type: SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME,
  payload: {header, value}
})

export const setUploadDataTypes = (uploadDataTypes) => ({
  type: SET_UPLOAD_DATA_TYPES,
  payload: {uploadDataTypes}
})