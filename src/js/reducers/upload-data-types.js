import {
  RESET_UPLOAD_DATA_TYPES,
  SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME,
  SET_UPLOAD_DATA_TYPES
} from '../actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case RESET_UPLOAD_DATA_TYPES:
      return {}
    case SET_UPLOAD_DATA_TYPES:
      return {
        ...action.payload
      }
    case SET_UPLOAD_DATA_TYPE_BY_HEADER_NAME:
      const {header, value} = action.payload
      return {
        ...state,
        [header]: value
      }
    default:
      return state
  }
}