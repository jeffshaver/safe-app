import {
  SET_ANALYTIC
} from '../actionTypes'

export default (state = '', action) => {
  switch (action.type) {
    case SET_ANALYTIC:
      return action.value
    default:
      return state
  }
}