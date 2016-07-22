import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'
import {checkFetchStatus, defaultFetchOptions} from './utilities'

export const FAILURE = 'safe-app/dashboard/FAILURE'
export const REQUEST = 'safe-app/dashboard/REQUEST'
export const SUCCESS = 'safe-app/dashboard/SUCCESS'

export const dashboardFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const dashboardRequest = () => ({
  type: REQUEST
})

export const dashboardSuccess = (data) => ({
  payload: {data},
  receivedAt: Date.now(),
  type: SUCCESS
})

const fetchDashboard = (id, dashboard, fetchOptions = {}, onSuccess = () => {}) =>
  (dispatch) => {
    dispatch(dashboardRequest())
    
    return fetch(`${apiUri}/dashboards${id ? '/' + id : ''}`, {
      ...defaultFetchOptions,
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: dashboard ? JSON.stringify(dashboard) : undefined,
      ...fetchOptions
    })
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => {
        onSuccess(json)
        
        dispatch(dashboardSuccess(json))

        return Promise.resolve(id)
      })
      .catch((error) => dispatch(dashboardFailure(error)))
  }

export const createDashboard = (dashboard = {}, onSuccess) =>
  fetchDashboard(dashboard._id, dashboard, {
    method: 'POST'
  }, onSuccess)

export const deleteDashboard = (id, onSuccess) =>
  fetchDashboard(id, null, {
    method: 'DELETE'
  }, onSuccess)

// ERROR: Method PUT is not allowed by Access-Control-Allow-Methods in preflight response.
export const editDashboard = (dashboard = {}, onSuccess) =>
  fetchDashboard(dashboard._id, dashboard, null, onSuccess)

export const revertDashboard = (id, onSuccess) =>
  fetchDashboard(id, null, {
    method: 'GET'
  }, onSuccess)

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