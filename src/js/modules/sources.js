import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'

export const REQUEST = 'safe-app/sources/REQUEST'
export const SUCCESS = 'safe-app/sources/SUCCESS'

export const fetchSourcesRequest = () => ({
  type: REQUEST
})

export const fetchSourcesSuccess = (data) => ({
  payload: {data},
  didInvalidate: false,
  isFetching: false,
  recievedAt: Date.now(),
  type: SUCCESS
})

export const fetchSources = () =>
  (dispatch) => {
    dispatch(fetchSourcesRequest())

    return fetch(`${apiUri}/sources`)
      .then((response) => response.json(), (err) => console.error(err))
      .then((json) => dispatch(fetchSourcesSuccess(json)))
  }

const initialState = {
  data: [],
  didInvalidate: false,
  isFetching: false,
  lastUpdated: null
}

export default (state = initialState, action) => {
  const {data} = action.payload || {}

  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        didInvalidate: false,
        isFetching: true
      }
    case SUCCESS:
      return {
        ...state,
        didInvalidate: false,
        data,
        isFetching: false,
        lastUpdated: action.recievedAt
      }
    default:
      return state
  }
}