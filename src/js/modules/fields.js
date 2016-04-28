import {apiUri} from '../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'

export const FAILURE = 'safe-app/fields/FAILURE'
export const REQUEST = 'safe-app/fields/REQUEST'
export const SUCCESS = 'safe-app/fields/SUCCESS'

export const fetchFieldsFailure = (error) => ({
  payload: {error},
  type: FAILURE
})
export const fetchFieldsRequest = () => ({
  type: REQUEST
})
export const fetchFieldsSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})
export const fetchFields = (source) => {
  return (dispatch) => {
    dispatch(fetchFieldsRequest())

    return fetch(`${apiUri}/sources/${source}/fields`)
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => dispatch(fetchFieldsSuccess(json)))
      .catch((error) => dispatch(fetchFieldsFailure(error)))
  }
}

const initialState = {
  data: [],
  error: undefined,
  isFetching: false,
  lastUpdated: null
}

export default (state = initialState, {payload = {}, type, ...action}) => {
  const {data, error} = payload

  switch (type) {
    case FAILURE:
      return {
        ...state,
        error,
        isFetching: false
      }
    case REQUEST:
      return {
        ...state,
        error: undefined,
        isFetching: true
      }
    case SUCCESS:
      return {
        ...state,
        data,
        error: undefined,
        isFetching: false,
        lastUpdated: action.recievedAt
      }
    default:
      return state
  }
}