import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'
import {checkFetchStatus, defaultFetchOptions} from './utilities'

export const ADD_DASHBOARD = 'safe-app/dashboards/ADD_DASHBOARD'
export const REMOVE_DASHBOARD = 'safe-app/dashboards/REMOVE_DASHBOARD'
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
      // Look for dashboard and replace with new one
      const groups = state.data.map((group) => {
        const {dashboards} = group
        
        // Remove if exists
        if (data.group) {
          group.dashboards = dashboards.filter((dashboard) => (
            data._id !== dashboard._id
          ))
        } else {
          group.dashboards = dashboards.map((dashboard) => {
            return data._id === dashboard._id ? {
              ...dashboard,
              ...data
            } : dashboard
          })
        }
        
        // Add to new group
        if (data.group === group._id) {
          group.dashboards.push(data)
        }
        
        return group
      })
      
      return {
        ...state,
        data: groups,
        lastUpdated: action.receivedAt
      }
    case REMOVE_DASHBOARD:
      const newGroups = state.data.map((group) => {
        group.dashboards = group.dashboards.filter((dashboard) => dashboard._id !== data)
        
        return group
      })
      
      return {
        ...state,
        data: newGroups,
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