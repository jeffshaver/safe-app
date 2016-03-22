import fetch from 'isomorphic-fetch'
import {
  FETCH_SOURCES_REQUEST,
  FETCH_SOURCES_SUCCESS
} from '../actionTypes'
import {apiUri} from '../../../config'

export const fetchSourcesSuccess = (json) => ({
  data: json,
  didInvalidate: false,
  isFetching: false,
  recievedAt: Date.now(),
  type: FETCH_SOURCES_SUCCESS
})

export const fetchSourcesRequest = () => ({
  type: FETCH_SOURCES_REQUEST
})

export const fetchSources = () =>
  (dispatch) => {
    dispatch(fetchSourcesRequest())
    return fetch(`${apiUri}/sources`)
      .then((response) => response.json(), (err) => console.log(err))
      .then((json) => dispatch(fetchSourcesSuccess(json)))
  }