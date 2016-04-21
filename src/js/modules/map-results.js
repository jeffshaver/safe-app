export const SET = 'safe-app/map-results/SET'

export const setMapResults = (mapResults) => ({
  type: SET,
  payload: {mapResults}
})

const initialState = {
  center: [39.904, -77.016],
  markers: []
}

export default (state = initialState, {payload = {}, type, ...action}) => {
  const {mapResults} = payload

  switch (type) {
    case SET:
      return mapResults
    default:
      return state
  }
}