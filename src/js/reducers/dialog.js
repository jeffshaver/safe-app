import {
    SET_DIALOG_OPEN
} from '../action-types'

export default (state = false, action) => {
  switch (action.type) {
    case SET_DIALOG_OPEN:
      return action.payload
    default:
      return state
  }
}