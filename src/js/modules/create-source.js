import {apiUri} from '../../../config'
import {doNewSourceSaved} from './uploads'
import fetch from 'isomorphic-fetch'
import {checkFetchStatus, defaultFetchOptions} from './utilities'

export const FAILURE = 'safe-app/create-source/FAILURE'
export const REQUEST = 'safe-app/create-source/REQUEST'
export const RESET = 'safe-app/create-source/RESET'
export const SUCCESS = 'safe-app/create-source/SUCCESS'

export const createSourceFailure = (error) => ({
  payload: {error},
  type: FAILURE
})
export const createSourceRequest = () => ({
  type: REQUEST
})
export const createSourceSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})
export const createSource = (name) =>
  (dispatch) => {
    dispatch(createSourceRequest())

    return fetch(`${apiUri}/sources`, {
      ...defaultFetchOptions,
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: JSON.stringify({name})
    })
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((json) => dispatch(createSourceSuccess(json)))
      .then(() => dispatch(doNewSourceSaved(true)))
      .catch((error) => {
        dispatch(createSourceFailure(error))
        dispatch(doNewSourceSaved(false))
      })
  }
export const resetNewSource = () => ({
  type: RESET
})

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
    case RESET:
      return initialState
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
