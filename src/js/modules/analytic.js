export const HYDRATE = 'safe-app/analytic/HYDRATE'
export const SET = 'safe-app/analytic/SET'

export const hydrateAnalytic = (analytic) => ({
  type: HYDRATE,
  state: analytic
})
export const setAnalytic = (analytic) => ({
  type: SET,
  payload: {analytic}
})

export default (state = '', action) => {
  const {analytic} = action.payload || {}

  switch (action.type) {
    case SET:
      return analytic
    default:
      return state
  }
}