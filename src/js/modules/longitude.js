export const SET = 'safe-app/longitude/SET'

export const setLongitude = (longitude) => ({
  type: SET,
  payload: {longitude}
})

export default (state = '', action) => {
  const {longitude} = action.payload || {}

  switch (action.type) {
    case SET:
      return longitude
    default:
      return state
  }
}