import {Map} from 'immutable'
import {
  RESET_UPLOAD_DATA_TYPES,
  SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME,
  SET_UPLOAD_DATA_TYPES
} from '../action-types'

export default (state = Map(), action) => {
  const {header, uploadDataTypes, value} = action.payload || {}

  switch (action.type) {
    case RESET_UPLOAD_DATA_TYPES:
      return Map()
    case SET_UPLOAD_DATA_TYPES:
      return Map(uploadDataTypes)
    case SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME:
      return state.set(header, value)
    default:
      return state
  }
}