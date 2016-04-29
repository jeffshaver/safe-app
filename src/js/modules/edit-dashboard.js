import {apiUri} from '../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'
import {fetchDashboards} from './dashboards'
import {setDashboard} from './dashboard'

export const FAILURE = 'safe-app/edit-dashboard/FAILURE'
export const REQUEST = 'safe-app/edit-dashboard/REQUEST'
export const SUCCESS = 'safe-app/edit-dashboard/SUCCESS'

export const editDashboardFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const editDashboardRequest = () => ({
  type: REQUEST
})

export const editDashboardSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

// ERROR: Method PUT is not allowed by Access-Control-Allow-Methods in preflight response.
export const editDashboard = (id, subtitle, title) =>
  (dispatch) => {
    dispatch(editDashboardRequest())

    return fetch(`${apiUri}/dashboards/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, subtitle, title})
    })
    .then(checkFetchStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch(editDashboardSuccess(json))
      // FUTURE: OPTIMISTIC UPDATE INSTEAD
      dispatch(fetchDashboards())
        .then(() => {
          const {_id: id, subtitle, title} = json

          dispatch(setDashboard(id, subtitle, title))
        })
    }).catch((error) => dispatch(editDashboardFailure(error)))
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
        lastUpdated: action.recievedAt
      }
    default:
      return state
  }
}