import {
  SET_SOURCE
} from '../actionTypes'

export const source = (state = '', action) => {
  switch (action.type) {
    case SET_SOURCE:
      return action.value
    default:
      return state
  }
}