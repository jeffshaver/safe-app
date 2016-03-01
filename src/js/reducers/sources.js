import {
  // FETCH_SOURCES_FAILURE,
  FETCH_SOURCES_REQUEST,
  FETCH_SOURCES_SUCCESS
} from '../actionTypes'

const initialState = {
  data: [],
  didInvalidate: false,
  isFetching: false,
  lastUpdated: null
}

export default (state = initialState, action) => {
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