export const RESET = 'safe-app/dashboard/RESET'
export const SET = 'safe-app/dashboard/SET'

export const resetDashboard = () => ({
  type: RESET
})

export const setDashboard = (dashboard) => ({
  payload: {...dashboard},
  type: SET
})

const initialState = {}

export default (state = initialState, {payload = {}, type, ...action}) => {
  switch (type) {
    case RESET:
      return initialState
    case SET:
      return {
        id: payload._id,
        ...payload
      }
    default:
      return state
  }
}