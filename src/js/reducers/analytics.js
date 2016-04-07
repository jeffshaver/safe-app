import {
  // FETCH_SOURCES_FAILURE,
  FETCH_ANALYTICS_REQUEST,
  FETCH_ANALYTICS_SUCCESS
} from '../action-types'

const initialState = {
  data: [],
  didInvalidate: false,
  isFetching: false,
  lastUpdated: null
}

export default (state = initialState, action) => {
  const {data} = action.payload || {}

  switch (action.type) {
    case FETCH_ANALYTICS_SUCCESS:
      return {
        ...state,
        data,
        didInvalidate: false,
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