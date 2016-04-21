export const HYDRATE = 'safe-app/visualization/HYDRATE'
export const SET = 'safe-app/visualization/SET'

export const hydrateVisualization = (visualization) => ({
  type: HYDRATE,
  state: visualization
})
export const setVisualization = (visualization) => ({
  type: SET,
  payload: {visualization}
})

export default (state = '', {payload = {}, type, ...action}) => {
  const {visualization} = payload

  switch (type) {
    case SET:
      return visualization
    default:
      return state
  }
}