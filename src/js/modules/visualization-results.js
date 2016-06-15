import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'
import {checkFetchStatus, defaultFetchOptions} from './utilities'

export const REMOVE = 'safe-app/visualization-results/REMOVE'
export const FAILURE = 'safe-app/visualization-results/FAILURE'
export const REQUEST = 'safe-app/visualization-results/REQUEST'
export const SUCCESS = 'safe-app/visualization-results/SUCCESS'

export const fetchVisualizationResultsFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const fetchVisualizationResultsRequest = () => ({
  type: REQUEST
})

export const fetchVisualizationResultsSuccess = (data, visualizationId) => ({
  payload: {data, visualizationId},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const fetchVisualizationResults = (visualizationId, filters) =>
  (dispatch) => {
    dispatch(fetchVisualizationResultsRequest())

    return fetch(`${apiUri}/execute/${visualizationId}`, {
      ...defaultFetchOptions,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filters)
    })
    .then(checkFetchStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch(fetchVisualizationResultsSuccess(json, visualizationId))

      return Promise.resolve()
    })
    .catch((error) => dispatch(fetchVisualizationResultsFailure(error)))
  }

export const removeVisualizationResults = (visualization) => ({
  payload: {visualization},
  type: REMOVE
})

const initialState = {
  data: {},
  error: undefined,
  isFetching: false,
  lastUpdated: null
}

export default (state = initialState, {payload = {}, type, ...action}) => {
  const {data: payloadData, error, visualizationId} = payload

  switch (type) {
    case REMOVE:
      // let {data = {}} = state
      // data = {...data}
      // delete data[visualizationId]
      return {
        ...state,
        data,
        error: undefined,
        isFetching: true
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
    case SUCCESS:
      const data = {
        ...state.data,
        [visualizationId]: payloadData
      }

      return {
        ...state,
        data,
        error,
        isFetching: false,
        lastUpdated: action.recievedAt
      }
    default:
      return state
  }
}