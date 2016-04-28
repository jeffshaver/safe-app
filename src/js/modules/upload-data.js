import {apiUri} from '../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'

export const FAILURE_EXIST = 'safe-app/upload-data/FAILURE_EXIST'
export const FAILURE_NEW = 'safe-app/upload-data/FAILURE_NEW'
export const REQUEST_EXIST = 'safe-app/upload-data/REQUEST_EXIST'
export const REQUEST_NEW = 'safe-app/upload-data/REQUEST_NEW'
export const RESET_EXIST = 'safe-app/upload-data/RESET_EXIST'
export const RESET_NEW = 'safe-app/upload-data/RESET_NEW'
export const SET_EXISTING_SOURCE_DATA = 'safe-app/upload-data/SET_EXISTING_SOURCE_DATA'
export const SET_NEW_SOURCE_DATA = 'safe-app/upload-data/SET_NEW_SOURCE_DATA'
export const SUCCESS_EXIST = 'safe-app/upload-data/SUCCESS_EXIST'
export const SUCCESS_NEW = 'safe-app/upload-data/SUCCESS_NEW'

export const createExistingSourceDataUploadFailure = (error) => ({
  payload: {error},
  type: FAILURE_EXIST
})
export const createExistingSourceDataUploadRequest = () => ({
  type: REQUEST_EXIST
})
export const createExistingSourceDataUploadSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS_EXIST
})

export const createNewSourceDataUploadFailure = (error) => ({
  payload: {error},
  type: FAILURE_NEW
})
export const createNewSourceDataUploadRequest = () => ({
  type: REQUEST_NEW
})
export const createNewSourceDataUploadSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS_NEW
})

export const resetExistingUploadData = () => ({
  type: RESET_EXIST
})
export const resetNewUploadData = () => ({
  type: RESET_NEW
})

export const setExistingSourceData = (uploadData) => ({
  payload: uploadData,
  type: SET_EXISTING_SOURCE_DATA
})
export const setNewSourceData = (uploadData) => ({
  payload: uploadData,
  type: SET_NEW_SOURCE_DATA
})

export const sendExistingSourceData = (sourceId, data) =>
  (dispatch) => {
    dispatch(createExistingSourceDataUploadRequest())
    
    // POST /sources/:source/data
    return fetch(`${apiUri}/sources/${sourceId}/data`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          document: data
        })
      })
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => dispatch(createExistingSourceDataUploadSuccess(json)))
      .catch((error) => dispatch(createExistingSourceDataUploadFailure(error)))
  }

export const sendNewSourceData = (sourceId, dataTypes, data) =>
  (dispatch) => {
    dispatch(createNewSourceDataUploadRequest())
    
    const formattedTypes = Object.keys(dataTypes).map(k => ({
      name: k,
      dataType: dataTypes[k]
    }))
    
    // POST /sources/:source/data
    return fetch(`${apiUri}/sources/${sourceId}/data`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: formattedTypes,
          document: data
        })
      })
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => dispatch(createNewSourceDataUploadSuccess(json)))
      .catch((error) => dispatch(createNewSourceDataUploadFailure(error)))
  }
    
const initialState = {
  dataExist: {},
  dataNew: {},
  errorExist: undefined,
  errorNew: undefined,
  existingSourceData: {},
  isFetchingExist: false,
  isFetchingNew: false,
  lastUpdatedExist: null,
  lastUpdatedNew: null,
  newSourceData: {}
}

export default (state = initialState, {payload = {}, type, ...action}) => {
  const {data, error} = payload

  switch (type) {
    case FAILURE_EXIST:
      return {
        ...state,
        errorExist: error,
        isFetchingExist: false
      }
    case FAILURE_NEW:
      return {
        ...state,
        errorNew: error,
        isFetchingNew: false
      }
    case REQUEST_EXIST:
      return {
        ...state,
        errorExist: undefined,
        isFetchingExist: true
      }
    case REQUEST_NEW:
      return {
        ...state,
        errorNew: undefined,
        isFetchingNew: true
      }
    case RESET_EXIST:
      return {
        ...state,
        dataExist: {},
        errorExist: undefined,
        existingSourceData: {},
        isFetchingExist: false,
        lastUpdatedExist: null
      }
    case RESET_NEW:
      return {
        ...state,
        dataNew: {},
        errorNew: undefined,
        isFetchingNew: false,
        lastUpdatedNew: null,
        newSourceData: {}
      }
    case SET_EXISTING_SOURCE_DATA:
      return {
        ...state,
        existingSourceData: payload
      }
    case SET_NEW_SOURCE_DATA:
      return {
        ...state,
        newSourceData: payload
      }
    case SUCCESS_EXIST:
      return {
        ...state,
        dataExist: data,
        errorExist: undefined,
        isFetchingExist: false,
        lastUpdatedExist: action.recievedAt
      }
    case SUCCESS_NEW:
      return {
        ...state,
        dataNew: data,
        errorNew: undefined,
        isFetchingNew: false,
        lastUpdatedNew: action.recievedAt
      }
    default:
      return state
  }
}
