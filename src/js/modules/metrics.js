import {apiUri} from '../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'

export const FAILURE = 'safe-app/metrics/FAILURE'
export const REQUEST = 'safe-app/metrics/REQUEST'
export const SUCCESS = 'safe-app/metrics/SUCCESS'

export const sendMetricsFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const sendMetricsRequest = () => ({
  type: REQUEST
})

export const sendMetricsSuccess = (data) => ({
  payload: {data},
  receivedAt: Date.now(),
  type: SUCCESS
})

export const sendMetrics = (data) =>
  (dispatch) => {
    dispatch(sendMetricsRequest())
    
    return fetch(`${apiUri}/metrics`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({events: data})
      })
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => dispatch(sendMetricsSuccess(json)))
      .catch((error) => dispatch(sendMetricsFailure(error)))
  }
  
// REDUCER
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