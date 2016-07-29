import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'
import {fetchDashboards} from './dashboards'
import {checkFetchStatus, defaultFetchOptions} from './utilities'

export const FAILURE = 'safe-app/delete-dashboard/FAILURE'
export const REQUEST = 'safe-app/delete-dashboard/REQUEST'
export const SUCCESS = 'safe-app/delete-dashboard/SUCCESS'

export const deleteDashboardFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const deleteDashboardRequest = () => ({
  type: REQUEST
})

export const deleteDashboardSuccess = (data) => ({
  payload: {data},
  receivedAt: Date.now(),
  type: SUCCESS
})

export const deleteDashboard = (id) =>
  (dispatch) => {
    dispatch(deleteDashboardRequest())

    return fetch(`${apiUri}/dashboards/${id}`, {
      ...defaultFetchOptions,
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => {
        dispatch(deleteDashboardSuccess(json))
        // FUTURE: OPTIMISTIC UPDATE INSTEAD
        dispatch(fetchDashboards())

        return Promise.resolve('')
      })
      .catch((error) => dispatch(deleteDashboardFailure(error)))
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