import {
  SET_ANALYTIC
} from '../action-types'

export default (state = '', action) => {
  const {analytic} = action.payload || {}

  switch (action.type) {
    case SET_ANALYTIC:
      return analytic
    default:
      return state
  }
}