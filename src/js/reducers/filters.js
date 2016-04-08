import {
  ADD_FILTER,
  EDIT_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS
} from '../action-types'

let nextFilterId = 0
const initialState = [{
  id: nextFilterId,
  field: '',
  operator: '',
  value: ''
}]

export default (state = initialState, action) => {
  const {filter, index, value} = action.payload || {}

  switch (action.type) {
    case ADD_FILTER:
      return [
        ...state,
        {
          ...filter,
          id: ++nextFilterId
        }
      ]
    case EDIT_FILTER:
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          ...value
        },
        ...state.slice(index + 1)
      ]
    case REMOVE_FILTER:
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]
    case RESET_FILTERS:
      return []
    default:
      return state
  }
}