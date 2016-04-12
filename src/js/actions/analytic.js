import {
  HYDRATE_ANALYTIC,
  SET_ANALYTIC
} from '../action-types'

export const hydrateAnalytic = (analytic) => ({
  type: HYDRATE_ANALYTIC,
  state: analytic
})

export const setAnalytic = (analytic) => ({
  type: SET_ANALYTIC,
  payload: {analytic}
})