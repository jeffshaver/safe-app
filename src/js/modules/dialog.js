export const TOGGLE = 'safe-app/dialog/TOGGLE'

export const toggleDialog = (value) => ({
  type: TOGGLE,
  payload: {value}
})

export default (state = false, action) => {
  const {value} = action.payload || {}

  switch (action.type) {
    case TOGGLE:
      return value
    default:
      return state
  }
}