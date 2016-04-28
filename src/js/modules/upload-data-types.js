export const RESET = 'safe-app/upload-data-types/RESET'
export const SET = 'safe-app/upload-data-types/SET'
export const SET_BY_HEADER_NAME = 'safe-app/upload-data-types/SET_BY_HEADER_NAME'

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

export default (state = {}, {payload = {}, type, ...action}) => {
  const {header, uploadDataTypes, value} = payload

  switch (type) {
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