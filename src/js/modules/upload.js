export const RESET = 'safe-app/upload/RESET'
export const SET = 'safe-app/upload/SET'
export const SET_BY_HEADER_NAME = 'safe-app/upload/SET_BY_HEADER_NAME'

export const resetUploadDataTypes = () => ({
  type: RESET
})

export const setUploadDataTypeByHeaderName = (header, value) => ({
  type: SET_BY_HEADER_NAME,
  payload: {header, value}
})

export const setUploadDataTypes = (uploadDataTypes) => ({
  type: SET,
  payload: {uploadDataTypes}
})

export default (state = {}, action) => {
  const {header, uploadDataTypes, value} = action.payload || {}

  switch (action.type) {
    case RESET:
      return {}
    case SET:
      return {
        ...uploadDataTypes
      }
    case SET_BY_HEADER_NAME:
      return {
        ...state,
        [header]: value
      }
    default:
      return state
  }
}