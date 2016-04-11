import {
  SET_SOURCE
} from '../action-types'

export default (state = '', action) => {
  switch (action.type) {
    case SET_SOURCE:
      return action.value
    default:
      return state
  }
}