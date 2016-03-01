import fetch from 'isomorphic-fetch'
import {
  FETCH_VISUALIZATIONS_REQUEST,
  FETCH_VISUALIZATIONS_SUCCESS
} from '../actionTypes'
import {domain, port, protocol} from '../../../config'

export const fetchVisualizationsSuccess = (json) => ({
  data: json.visualizations,
  didInvalidate: false,
  isFetching: false,
  recievedAt: Date.now(),
  type: FETCH_VISUALIZATIONS_SUCCESS
})

export const fetchVisualizationsRequest = () => ({
  type: FETCH_VISUALIZATIONS_REQUEST
})

export const fetchVisualizations = (analytic) =>
  (dispatch) => {
    dispatch(fetchVisualizationsRequest())
    return fetch(`${protocol}://${domain}${port ? ':' + port : ''}/analytics/${analytic}/visualizations`)
      .then((response) => response.json(), (err) => console.log(err))
      .then((json) => dispatch(fetchVisualizationsSuccess(json)))
  }