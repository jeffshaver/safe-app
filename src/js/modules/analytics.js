import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'

export const REQUEST = 'safe-app/analytics/REQUEST'
export const SUCCESS = 'safe-app/analytics/SUCCESS'

export const fetchAnalyticsRequest = () => ({
  type: REQUEST
})

export const fetchAnalyticsSuccess = (data) => ({
  didInvalidate: false,
  isFetching: false,
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const fetchAnalytics = (source) =>
  (dispatch) => {
    dispatch(fetchAnalyticsRequest())

    return fetch(`${apiUri}/sources/${source}/analytics`)
      .then((response) => response.json(), (err) => console.error(err))
      .then((json) => dispatch(fetchAnalyticsSuccess(json)))
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
    case REQUEST:
      return {
        ...state,
        didInvalidate: false,
        isFetching: true
      }
    case SUCCESS:
      return {
        ...state,
        data,
        didInvalidate: false,
        isFetching: false,
        lastUpdated: action.recievedAt
      }
    default:
      return state
  }
}