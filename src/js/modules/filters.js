import uuid from 'node-uuid'

export const ADD = 'safe-app/filters/ADD'
export const EDIT = 'safe-app/filters/EDIT'
export const REMOVE = 'safe-app/filters/REMOVE'
export const SET = 'safe-app/filters/SET'

export const addFilter = (containerId, filter) => {
  const id = uuid.v1()

  return {
    type: ADD,
    payload: {containerId, id, filter}
  }
}

export const editFilter = (containerId, id, value) => ({
  type: EDIT,
  payload: {containerId, id, value}
})

export const removeFilter = (containerId, id) => ({
  type: REMOVE,
  payload: {containerId, id}
})

export const setFilters = (containerId, filters) => ({
  type: SET,
  payload: {containerId, filters}
})

export default (state = {}, {payload = {}, type, ...action}) => {
  const {containerId, filter, filters, id, value} = payload

  switch (type) {
    case ADD:
      return {
        ...state,
        [containerId]: {
          ...state[containerId],
          [id]: {
            ...filter
          }
        }
      }
    case EDIT:
      return {
        ...state,
        [containerId]: {
          ...state[containerId],
          [id]: {
            ...state[containerId][id],
            ...value
          }
        }
      }
    case REMOVE:
      const newState = {
        ...state,
        [containerId]: {
          ...state[containerId]
        }
      }

      delete newState[containerId][id]

      return newState
    case SET:
      return {
        ...state,
        [containerId]: {
          ...filters
        }
      }
    default:
      return state
  }
}