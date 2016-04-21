import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'

export const REQUEST = 'safe-app/user/REQUEST'
export const SUCCESS = 'safe-app/user/SUCCESS'

export const fetchUserRequest = (json) => ({
  type: REQUEST
})

export const fetchUserSuccess = (data) => ({
  payload: {data},
  didInvalidate: false,
  isFetching: false,
  recievedAt: Date.now(),
  type: SUCCESS
})

export const fetchUser = () =>
  (dispatch) => {
    dispatch(fetchUserRequest())

    return fetch(`${apiUri}/authenticate`)
      .then((response) => response.json(), (err) => console.error(err))
      .then((json) => dispatch(fetchUserSuccess(json)))
  }

const initialState = {
  data: {},
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
        didInvalidate: false,
        data,
        isFetching: false,
        lastUpdated: action.recievedAt
      }
    default:
      return state
  }
}