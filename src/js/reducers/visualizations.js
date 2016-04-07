import {
  // FETCH_SOURCES_FAILURE,
  FETCH_VISUALIZATIONS_REQUEST,
  FETCH_VISUALIZATIONS_SUCCESS
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
    case FETCH_VISUALIZATIONS_SUCCESS:
      return {
        ...state,
        data,
        didInvalidate: false,
        isFetching: false,
        lastUpdated: action.recievedAt
      }
    case FETCH_VISUALIZATIONS_REQUEST:
      return {
        ...state,
        didInvalidate: false,
        isFetching: true

      }
    default:
      return state
  }
}