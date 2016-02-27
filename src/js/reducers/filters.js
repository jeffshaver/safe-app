import {
  ADD_FILTER,
  EDIT_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS
} from '../actionTypes'

let nextFilterId = 0
export const filters = (state = [
  {
    id: nextFilterId,
    field: '',
    operator: '',
    value: ''
  }
], action) => {
  switch (action.type) {
    case ADD_FILTER:
      return [
        ...state,
        action.value
      ]
    case EDIT_FILTER:
      return [
        ...state.slice(0, action.index),
        {
          ...state[action.index],
          ...action.value
        },
        ...state.slice(action.index + 1)
      ]
    case REMOVE_FILTER:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
    case RESET_FILTERS:
      return []
    default:
      return state
  }
}