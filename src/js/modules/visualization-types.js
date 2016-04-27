import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'

export const REQUEST = 'safe-app/visualization-types/REQUEST'
export const SUCCESS = 'safe-app/visualization-types/SUCCESS'

export const fetchVisualizationTypesRequest = () => ({
  type: REQUEST
})

export const fetchVisualizationTypesSuccess = (data) => ({
  payload: {data},
  didInvalidate: false,
  isFetching: false,
  recievedAt: Date.now(),
  type: SUCCESS
})

export const fetchVisualizationTypes = (analytic) =>
  (dispatch) => {
    dispatch(fetchVisualizationTypesRequest())

    return fetch(`${apiUri}/analytics/${analytic}/visualization-types`)
      .then((response) => response.json(), (err) => console.error(err))
      .then((json) => dispatch(fetchVisualizationTypesSuccess(json)))
  }

const initialState = {
  data: [],
  didInvalidate: false,
  isFetching: false,
  lastUpdated: null
}

export default (state = initialState, {payload = {}, type, ...action}) => {
  const {data} = payload

  switch (type) {
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