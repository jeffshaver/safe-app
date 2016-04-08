import {
    SET_DIALOG_OPEN
} from '../action-types'

export default (state = false, action) => {
  const {value} = action.payload || {}

  switch (action.type) {
    case SET_DIALOG_OPEN:
      return value
    default:
      return state
  }
}