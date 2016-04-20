export const SET = 'safe-app/map-results/SET'

export const setMapResults = (mapResults) => ({
  type: SET,
  payload: {mapResults}
})

const initialState = {
  center: [39.904, -77.016],
  markers: []
}

export default (state = initialState, action) => {
  const {mapResults} = action.payload || {}

  switch (action.type) {
    case SET:
      return mapResults
    default:
      return state
  }
}