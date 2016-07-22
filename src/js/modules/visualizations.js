import {apiUri} from '../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'

export const FAILURE = 'safe-app/visualizations/FAILURE'
export const REQUEST = 'safe-app/visualizations/REQUEST'
export const SUCCESS = 'safe-app/visualizations/SUCCESS'

export const fetchVisualizationsFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const fetchVisualizationsRequest = () => ({
  type: REQUEST
})

export const fetchVisualizationsSuccess = (data) => ({
  payload: {data},
  receivedAt: Date.now(),
  type: SUCCESS
})

export const fetchVisualizations = () =>
  (dispatch) => {
    dispatch(fetchVisualizationsRequest())

    return fetch(`${apiUri}/visualizations`)
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => {
        dispatch(fetchVisualizationsSuccess(json))

        return Promise.resolve()
      })
      .catch((error) => dispatch(fetchVisualizationsFailure(error)))
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