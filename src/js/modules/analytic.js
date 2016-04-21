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

export default (state = '', {payload = {}, type, ...action}) => {
  const {analytic} = payload

  switch (type) {
    case SET:
      return analytic
    default:
      return state
  }
}