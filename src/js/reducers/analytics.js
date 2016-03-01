import {
  // FETCH_SOURCES_FAILURE,
  FETCH_ANALYTICS_REQUEST,
  FETCH_ANALYTICS_SUCCESS
} from '../actionTypes'

const initialState = {
  data: [],
  didInvalidate: false,
  isFetching: false,
  lastUpdated: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ANALYTICS_SUCCESS:
      return {
        ...state,
        didInvalidate: false,
        data: action.data,
        isFetching: false,
        lastUpdated: action.recievedAt
      }
    case FETCH_ANALYTICS_REQUEST:
      return {
        ...state,
        didInvalidate: false,
        isFetching: true

      }
    default:
      return state
  }
}