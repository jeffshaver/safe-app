export const TOGGLE = 'safe-app/dialog/TOGGLE'

export const toggleDialog = (value) => ({
  type: TOGGLE,
  payload: {value}
})

export default (state = false, {payload = {}, type, ...action}) => {
  const {value} = payload

  switch (type) {
    case TOGGLE:
      return value
    default:
      return state
  }
}