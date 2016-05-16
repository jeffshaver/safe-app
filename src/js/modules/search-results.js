import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'
import {checkFetchStatus, defaultFetchOptions} from './utilities'

export const FAILURE = 'safe-app/search-results/FAILURE'
export const REQUEST = 'safe-app/search-results/REQUEST'
export const SUCCESS = 'safe-app/search-results/SUCCESS'

export const fetchSearchResultsFailure = (error) => ({
  payload: {error},
  type: FAILURE
})
export const fetchSearchResultsRequest = () => ({
  type: REQUEST
})
export const fetchSearchResultsSuccess = (data) => ({
  payload: {data},
  receivedAt: Date.now(),
  type: SUCCESS
})
export const fetchSearchResults = (source, filters) =>
  (dispatch) => {
    dispatch(fetchSearchResultsRequest())

    return fetch(`${apiUri}/sources/${source}/query`, {
      ...defaultFetchOptions,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({filters})
    })
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => dispatch(fetchSearchResultsSuccess(json)))
      .catch((error) => dispatch(fetchSearchResultsFailure(error)))
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