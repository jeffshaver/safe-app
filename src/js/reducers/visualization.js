import {
  SET_VISUALIZATION
} from '../action-types'

export default (state = '', action) => {
  switch (action.type) {
    case SET_VISUALIZATION:
      return action.value
    default:
      return state
  }
}