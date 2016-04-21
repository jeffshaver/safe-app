export const SET = 'safe-app/longitude/SET'

export const setLongitude = (longitude) => ({
  type: SET,
  payload: {longitude}
})

export default (state = '', {payload = {}, type, ...action}) => {
  const {longitude} = payload

  switch (type) {
    case SET:
      return longitude
    default:
      return state
  }
}