import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'
import {checkFetchStatus, defaultFetchOptions} from './utilities'

export const FAILURE = 'safe-app/dashboard-groups/FAILURE'
export const REQUEST = 'safe-app/dashboard-groups/REQUEST'
export const RESET = 'safe-app/dashboard-groups/RESET'
export const SUCCESS = 'safe-app/dashboard-groups/SUCCESS'

export const fetchDashboardGroupsFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const fetchDashboardGroupsRequest = () => ({
  type: REQUEST
})

export const fetchDashboardGroupsReset = () => ({
  type: RESET
})

export const fetchDashboardGroupsSuccess = (data) => ({
  payload: {data},
  receivedAt: Date.now(),
  type: SUCCESS
})

export const fetchDashboardGroups = () =>
  (dispatch) => {
    dispatch(fetchDashboardGroupsRequest())

    return fetch(`${apiUri}/dashboard-groups`, {...defaultFetchOptions})
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => {
        dispatch(fetchDashboardGroupsSuccess(json))

        return Promise.resolve()
      })
      .catch((error) => dispatch(fetchDashboardGroupsFailure(error)))
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