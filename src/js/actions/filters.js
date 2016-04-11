import {
  ADD_FILTER,
  EDIT_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS
} from '../action-types'

export const addFilter = (filters) => ({
  type: ADD_FILTER,
  value: filters
})

export const editFilter = (index, field) => ({
  type: EDIT_FILTER,
  index,
  value: field
})

export const removeFilter = (index) => ({
  type: REMOVE_FILTER,
  index
})

export const resetFilters = () => ({
  type: RESET_FILTERS
})