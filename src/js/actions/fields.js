import fetch from 'isomorphic-fetch'
import {
  // FETCH_SOURCE_FIELDS_FAILURE,
  FETCH_SOURCE_FIELDS_REQUEST,
  FETCH_SOURCE_FIELDS_SUCCESS
} from '../action-types'
import {apiUri} from '../../../config'

export const fetchSourceFieldsSuccess = (data) => ({
  payload: {data},
  didInvalidate: false,
  isFetching: false,
  recievedAt: Date.now(),
  type: FETCH_SOURCE_FIELDS_SUCCESS
})

export const fetchSourceFieldsRequest = (source) => ({
  type: FETCH_SOURCE_FIELDS_REQUEST,
  payload: {source}
})

export const fetchSourceFields = (source) => {
  return (dispatch) => {
    dispatch(fetchSourceFieldsRequest(source))
    return fetch(`${apiUri}/sources/${source}/fields`)
      .then((response) => response.json())
      .then((json) => dispatch(fetchSourceFieldsSuccess(json)))
  }
}