import {
  // FETCH_SOURCES_FAILURE,
  FETCH_SOURCES_REQUEST,
  FETCH_SOURCES_SUCCESS
} from '../actionTypes'

export const sources = (state = {
  data: [],
  didInvalidate: false,
  isFetching: false,
  lastUpdated: null
}, action) => {
  switch (action.type) {
    case FETCH_SOURCES_SUCCESS:
      return {
        ...state,
        didInvalidate: false,
        data: action.data,
        isFetching: false,
        lastUpdated: action.recievedAt
      }
    case FETCH_SOURCES_REQUEST:
      return {
        ...state,
        didInvalidate: false,
        isFetching: true

      }
    default:
      return state
  }
}