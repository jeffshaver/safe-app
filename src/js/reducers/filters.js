import {List, Map} from 'immutable'
import {
  ADD_FILTER,
  EDIT_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS
} from '../action-types'

let nextFilterId = 0
const initialState = List([Map({
  field: '',
  id: nextFilterId,
  operator: '',
  value: ''
})])

export default (state = initialState, action) => {
  const {filter, index, value} = action.payload || {}

  switch (action.type) {
    case ADD_FILTER:
      return state.push(Map({
        field: filter.field,
        id: ++nextFilterId,
        operator: filter.operator,
        value: filter.value
      }))
    case EDIT_FILTER:
      return state.update(index, (oldValue) => oldValue.merge(value))
    case REMOVE_FILTER:
      return state.delete(index)
    case RESET_FILTERS:
      return initialState
    default:
      return state
  }
}