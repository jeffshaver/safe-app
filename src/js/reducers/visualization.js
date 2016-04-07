import {
  SET_VISUALIZATION
} from '../action-types'

export default (state = '', action) => {
  const {visualization} = action.payload || {}

  switch (action.type) {
    case SET_VISUALIZATION:
      return visualization
    default:
      return state
  }
}