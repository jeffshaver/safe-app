import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'
import {checkFetchStatus, defaultFetchOptions} from './utilities'

export const FAILURE = 'safe-app/analytics/FAILURE'
export const REQUEST = 'safe-app/analytics/REQUEST'
export const SUCCESS = 'safe-app/analytics/SUCCESS'

export const fetchAnalyticsFailure = (error) => ({
  payload: {error},
  type: FAILURE
})
export const fetchAnalyticsRequest = () => ({
  type: REQUEST
})
export const fetchAnalyticsSuccess = (data) => ({
  payload: {data},
  receivedAt: Date.now(),
  type: SUCCESS
})
export const fetchAnalytics = (source) =>
  (dispatch) => {
    dispatch(fetchAnalyticsRequest())

    return fetch(`${apiUri}/sources/${source}/analytics`, {...defaultFetchOptions})
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => dispatch(fetchAnalyticsSuccess(json)))
      .catch((error) => dispatch(fetchAnalyticsFailure(error)))
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