import {
  ADD_FILTER,
  EDIT_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS
} from '../action-types'

export const addFilter = (filter) => ({
  type: ADD_FILTER,
  payload: {filter}
})

export const editFilter = (index, value) => ({
  type: EDIT_FILTER,
  payload: {index, value}
})

export const removeFilter = (index) => ({
  type: REMOVE_FILTER,
  payload: {index}
})

export const resetFilters = () => ({
  type: RESET_FILTERS
})