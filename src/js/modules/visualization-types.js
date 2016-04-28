import {apiUri} from '../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'

export const FAILURE = 'safe-app/visualization-types/FAILURE'
export const REQUEST = 'safe-app/visualization-types/REQUEST'
export const SUCCESS = 'safe-app/visualization-types/SUCCESS'

export const fetchVisualizationTypesFailure = (error) => ({
  payload: {error},
  type: FAILURE
})
export const fetchVisualizationTypesRequest = () => ({
  type: REQUEST
})
export const fetchVisualizationTypesSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})
export const fetchVisualizationTypes = (analytic) =>
  (dispatch) => {
    dispatch(fetchVisualizationTypesRequest())

    return fetch(`${apiUri}/analytics/${analytic}/visualization-types`)
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => dispatch(fetchVisualizationTypesSuccess(json)))
      .catch((error) => dispatch(fetchVisualizationTypesFailure(error)))
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
        error: undefined,
        isFetching: false,
        lastUpdated: action.recievedAt
      }
    default:
      return state
  }
}