import fetch from 'isomorphic-fetch'
import {
  // FETCH_SOURCE_FIELDS_FAILURE,
  FETCH_SOURCE_FIELDS_REQUEST,
  FETCH_SOURCE_FIELDS_SUCCESS
} from '../actionTypes'
import {domain, port} from '../../../config'

export const fetchSourceFieldsSuccess = (json) => ({
  data: json.fields,
  didInvalidate: false,
  isFetching: false,
  recievedAt: Date.now(),
  type: FETCH_SOURCE_FIELDS_SUCCESS
})

export const fetchSourceFieldsRequest = (source) => ({
  type: FETCH_SOURCE_FIELDS_REQUEST,
  source: source
})

export const fetchSourceFields = (source) => {
  return (dispatch) => {
    dispatch(fetchSourceFieldsRequest(source))
    return fetch(`https://${domain}${port ? ':' + port : ''}/sources/${source}/fields`)
      .then((response) => response.json())
      .then((json) => dispatch(fetchSourceFieldsSuccess(json)))
  }
}