import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'
import {fetchDashboards} from './dashboards'
import {setDashboard} from './dashboard'
import {checkFetchStatus, defaultFetchOptions} from './utilities'

export const FAILURE = 'safe-app/create-dashboard/FAILURE'
export const REQUEST = 'safe-app/create-dashboard/REQUEST'
export const SUCCESS = 'safe-app/create-dashboard/SUCCESS'

export const createDashboardFailure = (error) => ({
  payload: {error},
  type: FAILURE
})
export const createDashboardRequest = () => ({
  type: REQUEST
})
export const createDashboardSuccess = (data) => ({
  payload: {data},
  receivedAt: Date.now(),
  type: SUCCESS
})
export const createDashboard = (subtitle, title) =>
  (dispatch) => {
    dispatch(createDashboardRequest())

    return fetch(`${apiUri}/dashboards`, {
      ...defaultFetchOptions,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({subtitle, title})
    })
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => {
        dispatch(createDashboardSuccess(json))
        // FUTURE: OPTIMISTIC UPDATE INSTEAD
        dispatch(fetchDashboards())
          .then(() => {
            const {_id: id, subtitle, title} = json

            dispatch(setDashboard(id, subtitle, title))
          })
      })
      .catch((error) => dispatch(createDashboardFailure(error)))
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