import {
  // FETCH_SEARCH_RESULTS_FAILURE,
  FETCH_SEARCH_RESULTS_REQUEST,
  FETCH_SEARCH_RESULTS_SUCCESS
} from '../actionTypes'

const initialState = {
  data: [],
  didInvalidate: false,
  isFetching: false,
  lastUpdated: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        didInvalidate: false,
        data: action.data,
        isFetching: false,
        lastUpdated: action.recievedAt
      }
    case FETCH_SEARCH_RESULTS_REQUEST:
      return {
        ...state,
        didInvalidate: false,
        isFetching: true
      }
    default:
      return state
  }
}