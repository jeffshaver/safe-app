import {
  SET_VISUALIZATION
} from '../action-types'

export const setVisualization = (visualization) => ({
  type: SET_VISUALIZATION,
  payload: {visualization}
})