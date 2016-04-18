import fetch from 'isomorphic-fetch'
import {apiUri} from '../../../config'

export const REQUEST = 'safe-app/visualizations/REQUEST'
export const SUCCESS = 'safe-app/visualizations/SUCCESS'

export const fetchVisualizationsRequest = () => ({
  type: REQUEST
})

export const fetchVisualizationsSuccess = (data) => ({
  payload: {data},
  didInvalidate: false,
  isFetching: false,
  recievedAt: Date.now(),
  type: SUCCESS
})

export const fetchVisualizations = (analytic) =>
  (dispatch) => {
    dispatch(fetchVisualizationsRequest())
    return fetch(`${apiUri}/analytics/${analytic}/visualizations`)
      .then((response) => response.json(), (err) => console.log(err))
      .then((json) => dispatch(fetchVisualizationsSuccess(json)))
  }

const initialState = {
  data: [],
  didInvalidate: false,
  isFetching: false,
  lastUpdated: null
}

export default (state = initialState, action) => {
  const {data} = action.payload || {}

  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        data,
        didInvalidate: false,
        isFetching: false,
        lastUpdated: action.recievedAt
      }
    case REQUEST:
      return {
        ...state,
        didInvalidate: false,
        isFetching: true

      }
    default:
      return state
  }
}