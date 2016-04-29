export const RESET = 'safe-app/dashboard/RESET'
export const SET = 'safe-app/dashboard/SET'

export const resetDashboard = () => ({
  type: RESET
})

export const setDashboard = (id, subtitle, title) => ({
  payload: {id, subtitle, title},
  type: SET
})

const initialState = {
  id: '',
  subtitle: '',
  title: ''
}

export default (state = initialState, {payload = {}, type, ...action}) => {
  const {id, subtitle, title} = payload

  switch (type) {
    case RESET:
      return initialState
    case SET:
      return {
        id,
        subtitle,
        title
      }
    default:
      return state
  }
}