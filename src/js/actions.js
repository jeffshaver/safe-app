import {
  SET_DATA_SOURCE,
  SET_DATA_SOURCES,
  ADD_FILTER,
  EDIT_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS
} from './actionTypes'

export const setDataSource = (dataSource) => ({
  type: SET_DATA_SOURCE,
  value: dataSource
})

export const setDataSources = (dataSources) => ({
  type: SET_DATA_SOURCES,
  value: dataSources
})

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