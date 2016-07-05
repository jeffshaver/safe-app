import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'
import {checkFetchStatus, defaultFetchOptions} from './utilities'

export const FAILURE = 'safe-app/dashboards/FAILURE'
export const REQUEST = 'safe-app/dashboards/REQUEST'
export const RESET = 'safe-app/dashboards/RESET'
export const SUCCESS = 'safe-app/dashboards/SUCCESS'

export const fetchDashboardsFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const fetchDashboardsRequest = () => ({
  type: REQUEST
})

export const fetchDashboardsReset = () => ({
  type: RESET
})

export const fetchDashboardsSuccess = (data) => ({
  payload: {data},
  receivedAt: Date.now(),
  type: SUCCESS
})

export const fetchDashboards = () =>
  (dispatch) => {
    dispatch(fetchDashboardsRequest())

    return fetch(`${apiUri}/dashboards`, {...defaultFetchOptions})
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => {
        dispatch(fetchDashboardsSuccess(json))

        return Promise.resolve()
      })
      .catch((error) => dispatch(fetchDashboardsFailure(error)))
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