import {
  // FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS
} from '../action-types'

const initialState = {
  data: {},
  didInvalidate: false,
  isFetching: false,
  lastUpdated: null
}

export default (state = initialState, action) => {
  const {data} = action.payload || {}

  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        didInvalidate: false,
        data,
        isFetching: false,
        lastUpdated: action.recievedAt
      }
    case FETCH_USER_REQUEST:
      return {
        ...state,
        didInvalidate: false,
        isFetching: true

      }
    default:
      return state
  }
}