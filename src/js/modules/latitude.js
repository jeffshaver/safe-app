export const SET = 'safe-app/latitude/SET'

export const setLatitude = (latitude) => ({
  type: SET,
  payload: {latitude}
})

export default (state = '', action) => {
  const {latitude} = action.payload || {}

  switch (action.type) {
    case SET:
      return latitude
    default:
      return state
  }
}