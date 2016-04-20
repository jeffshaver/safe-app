export const SET = 'safe-app/label/SET'

export const setLabel = (label) => ({
  type: SET,
  payload: {label}
})

export default (state = '', action) => {
  const {label} = action.payload || {}

  switch (action.type) {
    case SET:
      return label
    default:
      return state
  }
}