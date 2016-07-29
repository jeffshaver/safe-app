import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'
import {checkFetchStatus, defaultFetchOptions} from './utilities'

export const REMOVE = 'safe-app/visualization-results/REMOVE'
export const FAILURE = 'safe-app/visualization-results/FAILURE'
export const REQUEST = 'safe-app/visualization-results/REQUEST'
export const SUCCESS = 'safe-app/visualization-results/SUCCESS'

export const fetchVisualizationResultsFailure = (error, id) => ({
  payload: {error, id},
  type: FAILURE
})

export const fetchVisualizationResultsRequest = (id) => ({
  payload: {id},
  type: REQUEST
})

export const fetchVisualizationResultsSuccess = (data, id) => ({
  payload: {data, id},
  receivedAt: Date.now(),
  type: SUCCESS
})

export const fetchVisualizationResults = (id, filters) =>
  (dispatch) => {
    dispatch(fetchVisualizationResultsRequest(id))

    return fetch(`${apiUri}/execute/${id}`, {
      ...defaultFetchOptions,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({filters})
    })
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => {
        dispatch(fetchVisualizationResultsSuccess(json, id))

        return Promise.resolve()
      })
      .catch((error) => dispatch(fetchVisualizationResultsFailure(error, id)))
  }

export const removeVisualizationResults = (visualization) => ({
  payload: {visualization},
  type: REMOVE
})

const initialState = {}
// This is used in the REQUEST part of the reducer
const resultsInitialState = {
  data: [],
  error: undefined,
  isFetching: false,
  lastUpdated: null
}

export default (state = initialState, {payload = {}, type, ...action}) => {
  const {data, error, id} = payload

  switch (type) {
    case FAILURE:
      return {
        ...state,
        [id]: {
          ...resultsInitialState,
          ...state[id],
          error,
          isFetching: false
        }
      }
    case REQUEST:
      return {
        ...state,
        [id]: {
          ...resultsInitialState,
          error: undefined,
          isFetching: true
        }
      }
    case SUCCESS:
      return {
        ...state,
        [id]: {
          ...resultsInitialState,
          ...state[id],
          data,
          error: undefined,
          isFetching: false,
          lastUpdated: action.recievedAt
        }
      }
    default:
      return state
  }
}