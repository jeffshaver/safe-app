import {
  SET_ANALYTIC
} from '../action-types'

export default (state = '', action) => {
  switch (action.type) {
    case SET_ANALYTIC:
      return action.value
    default:
      return state
  }
}