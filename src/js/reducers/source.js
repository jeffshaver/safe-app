import {
  SET_SOURCE
} from '../action-types'

export default (state = '', action) => {
  const {source} = action.payload || {}

  switch (action.type) {
    case SET_SOURCE:
      return source
    default:
      return state
  }
}