export const SET = 'safe-app/label/SET'

export const setLabel = (label) => ({
  type: SET,
  payload: {label}
})

export default (state = '', {payload = {}, type, ...action}) => {
  const {label} = payload

  switch (type) {
    case SET:
      return label
    default:
      return state
  }
}