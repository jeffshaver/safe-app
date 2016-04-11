import {
  // FETCH_SOURCE_FIELDS_FAILURE,
  FETCH_SOURCE_FIELDS_REQUEST,
  FETCH_SOURCE_FIELDS_SUCCESS
} from '../action-types'

const initialState = {
  data: [],
  didInvalidate: false,
  isFetching: false,
  lastUpdated: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SOURCE_FIELDS_SUCCESS:
      return {
        ...state,
        data: action.data,
        didInvalidate: false,
        isFetching: false,
        lastUpdated: action.recievedAt
      }
    case FETCH_SOURCE_FIELDS_REQUEST:
      return {
        ...state,
        didInvalidate: false,
        isFetching: true
      }
    default:
      return state
  }
}

export const fieldsTwo = () => {}