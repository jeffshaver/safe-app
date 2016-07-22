import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'
import {checkFetchStatus, defaultFetchOptions} from './utilities'

export const ADD_DASHBOARD = 'safe-app/dashboards/ADD_DASHBOARD'
export const REMOVE_DASHBOARD = 'safe-app/dashboards/REMOVE_DASHBOARD'
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
  
export const addDashboard = (dashboard) => ({
  payload: {data: dashboard},
  receivedAt: Date.now(),
  type: ADD_DASHBOARD
})

export const editDashboard = (dashboard) => (addDashboard(dashboard))

export const removeDashboard = (id) => ({
  payload: {data: id},
  receivedAt: Date.now(),
  type: REMOVE_DASHBOARD
})

const initialState = {
  data: [],
  error: undefined,
  isFetching: false,
  lastUpdated: null
}

export default (state = initialState, {payload = {}, type, ...action}) => {
  const {data, error} = payload

  switch (type) {
    case ADD_DASHBOARD:
      let foundDashboard = false
      
      // Look for dashboard and replace with new one
      const dashboards = state.data.map((dashboard) => {
        if (data._id === dashboard._id) {
          foundDashboard = true
         
          return data
        }
       
        return dashboard
      })
      
      // If not found, add it.
      if (!foundDashboard) {
        dashboards.push(data)
      }
      
      return {
        ...state,
        data: dashboards,
        lastUpdated: action.receivedAt
      }
    case REMOVE_DASHBOARD:
      const newDashboards =
        state.data.filter((dashboard) => dashboard._id !== data)
      
      return {
        ...state,
        data: newDashboards,
        lastUpdated: action.receivedAt
      }
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