import {
  SET_ANALYTIC
} from '../action-types'

export const setAnalytic = (analytic) => ({
  type: SET_ANALYTIC,
  payload: {analytic}
})