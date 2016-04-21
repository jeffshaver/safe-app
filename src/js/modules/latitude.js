export const SET = 'safe-app/latitude/SET'

export const setLatitude = (latitude) => ({
  type: SET,
  payload: {latitude}
})

export default (state = '', {payload = {}, type, ...action}) => {
  const {latitude} = payload

  switch (type) {
    case SET:
      return latitude
    default:
      return state
  }
}