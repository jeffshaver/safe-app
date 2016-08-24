export const ADD = 'safe-app/filters/ADD'
export const EDIT = 'safe-app/filters/EDIT'
export const HYDRATE = 'safe-app/filters/HYDRATE'
export const REMOVE = 'safe-app/filters/REMOVE'
export const RESET = 'safe-app/filters/RESET'
export const SET_DEFAULT = 'safe-app/filters/SET_DEFAULT'

export const addFilter = (filter) => ({
  type: ADD,
  payload: {filter}
})

export const editFilter = (index, value) => ({
  type: EDIT,
  payload: {index, value}
})

export const hydrateFilters = (filters) => ({
  type: HYDRATE,
  state: filters
})

export const removeFilter = (index) => ({
  type: REMOVE,
  payload: {index}
})

export const resetFilters = () => ({
  type: RESET
})

export const setDefaultFilters = (filters) => ({
  payload: {filters},
  type: SET_DEFAULT
})

let nextFilterId = 0
const initialState = [{
  id: nextFilterId,
  field: '',
  operator: '=',
  required: false,
  value: ''
}]

export default (state = initialState, {payload = {}, type, ...action}) => {
  const {filter, filters, index, value} = payload

  switch (type) {
    case ADD:
      return [
        ...state,
        {
          ...filter,
          id: ++nextFilterId
        }
      ]
    case EDIT:
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          ...value
        },
        ...state.slice(index + 1)
      ]
    case REMOVE:
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]
    case RESET:
      const newFilters = [...initialState]

      newFilters[0].id = ++nextFilterId

      return newFilters
    case SET_DEFAULT:
      return [...filters]
    case HYDRATE:
      return [...state]
    default:
      return state
  }
}