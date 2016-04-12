import {
  HYDRATE_VISUALIZATION,
  SET_VISUALIZATION
} from '../action-types'

export const hydrateVisualization = (visualization) => ({
  type: HYDRATE_VISUALIZATION,
  state: visualization
})
export const setVisualization = (visualization) => ({
  type: SET_VISUALIZATION,
  payload: {visualization}
})