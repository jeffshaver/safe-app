import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'
import {checkFetchStatus, defaultFetchOptions} from './utilities'

export const FAILURE = 'safe-app/user/FAILURE'
export const REQUEST = 'safe-app/user/REQUEST'
export const SUCCESS = 'safe-app/user/SUCCESS'

export const fetchUserFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const fetchUserRequest = (json) => ({
  type: REQUEST
})

export const fetchUserSuccess = (data) => ({
  payload: {data},
  receivedAt: Date.now(),
  type: SUCCESS
})

export const fetchUser = () =>
  (dispatch) => {
    dispatch(fetchUserRequest())

    return fetch(`${apiUri}/authenticate`, {...defaultFetchOptions})
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => dispatch(fetchUserSuccess(json)))
      .catch((error) => dispatch(fetchUserFailure(error)))
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