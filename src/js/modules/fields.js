import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'

export const REQUEST = 'safe-app/fields/REQUEST'
export const SUCCESS = 'safe-app/fields/SUCCESS'

export const fetchFieldsRequest = (source) => ({
  type: REQUEST,
  payload: {source}
})

export const fetchFieldsSuccess = (data) => ({
  payload: {data},
  didInvalidate: false,
  isFetching: false,
  recievedAt: Date.now(),
  type: SUCCESS
})

export const fetchFields = (source) => {
  return (dispatch) => {
    dispatch(fetchFieldsRequest(source))

    return fetch(`${apiUri}/sources/${source}/fields`)
      .then((response) => response.json())
      .then((json) => dispatch(fetchFieldsSuccess(json)))
  }
}

const initialState = {
  data: [],
  didInvalidate: false,
  isFetching: false,
  lastUpdated: null
}

export default (state = initialState, {payload = {}, type, ...action}) => {
  const {data} = payload

  switch (type) {
    case REQUEST:
      return {
        ...state,
        didInvalidate: false,
        isFetching: true
      }
    case SUCCESS:
      return {
        ...state,
        data,
        didInvalidate: false,
        isFetching: false,
        lastUpdated: action.recievedAt
      }
    default:
      return state
  }
}