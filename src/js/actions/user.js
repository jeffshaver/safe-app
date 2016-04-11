import fetch from 'isomorphic-fetch'
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS
} from '../action-types'
import {apiUri} from '../../../config'

export const fetchUserSuccess = (json) => ({
  data: json,
  didInvalidate: false,
  isFetching: false,
  recievedAt: Date.now(),
  type: FETCH_USER_SUCCESS
})

export const fetchUserRequest = (json) => ({
  type: FETCH_USER_REQUEST
})

export const fetchUser = () =>
  (dispatch) => {
    dispatch(fetchUserRequest())
    return fetch(`${apiUri}/authenticate`)
      .then((response) => response.json(), (err) => console.log(err))
      .then((json) => dispatch(fetchUserSuccess(json)))
  }