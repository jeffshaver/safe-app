import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import {
  SET_DATA_SOURCE,
  SET_DATA_SOURCES,
  ADD_FILTER,
  EDIT_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS
} from './actionTypes'

export const dataSource = (state = '', action) => {
  switch (action.type) {
    case SET_DATA_SOURCE:
      return action.value
    default:
      return state
  }
}

export const dataSources = (state = [], action) => {
  switch (action.type) {
    case SET_DATA_SOURCES:
      return action.value
    default:
      return state
  }
}

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

export const rootReducer = combineReducers({
  dataSource,
  dataSources,
  filters,

  // for react-router-redux
  routing
})