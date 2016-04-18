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

export default (state = '', action) => {
  const {visualization} = action.payload || {}

  switch (action.type) {
    case SET:
      return visualization
    default:
      return state
  }
}