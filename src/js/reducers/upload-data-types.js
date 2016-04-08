import {
  RESET_UPLOAD_DATA_TYPES,
  SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME,
  SET_UPLOAD_DATA_TYPES
} from '../action-types'

export default (state = {}, action) => {
  const {header, uploadDataTypes, value} = action.payload || {}

  switch (action.type) {
    case RESET_UPLOAD_DATA_TYPES:
      return {}
    case SET_UPLOAD_DATA_TYPES:
      return {
        ...uploadDataTypes
      }
    case SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME:
      return {
        ...state,
        [header]: value
      }
    default:
      return state
  }
}