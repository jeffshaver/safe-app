import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'
import {checkFetchStatus, defaultFetchOptions} from './utilities'

export const FAILURE = 'safe-app/alerts/FAILURE'
export const REQUEST = 'safe-app/alerts/REQUEST'
export const RESET = 'safe-app/alerts/RESET'
export const SUCCESS = 'safe-app/alerts/SUCCESS'

export const fetchAlertsFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const fetchAlertsRequest = () => ({
  type: REQUEST
})

export const fetchAlertsReset = () => ({
  type: RESET
})

export const fetchAlertsSuccess = (data) => ({
  payload: {data},
  receivedAt: Date.now(),
  type: SUCCESS
})

export const fetchAlerts = () =>
  (dispatch) => {
    dispatch(fetchAlertsRequest())

    return fetch(`${apiUri}/alerts`, {...defaultFetchOptions})
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => {
        dispatch(fetchAlertsSuccess(json))

        return Promise.resolve()
      })
      .catch((error) => dispatch(fetchAlertsFailure(error)))
  }

const initialState = {
  data: {},
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
    case RESET:
      return initialState
    case SUCCESS:
      return {
        ...state,
        data,
        error,
        isFetching: false,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}