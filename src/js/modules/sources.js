import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'
import {checkFetchStatus, defaultFetchOptions} from './utilities'

export const FAILURE = 'safe-app/sources/FAILURE'
export const REQUEST = 'safe-app/sources/REQUEST'
export const SUCCESS = 'safe-app/sources/SUCCESS'

export const fetchSourcesFailure = (error) => ({
  payload: {error},
  type: FAILURE
})
export const fetchSourcesRequest = () => ({
  type: REQUEST
})
export const fetchSourcesSuccess = (data) => ({
  payload: {data},
  receivedAt: Date.now(),
  type: SUCCESS
})
export const fetchSources = () =>
  (dispatch) => {
    dispatch(fetchSourcesRequest())

    return fetch(`${apiUri}/sources`, {...defaultFetchOptions})
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => dispatch(fetchSourcesSuccess(json)))
      .catch((error) => dispatch(fetchSourcesFailure(error)))
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
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}