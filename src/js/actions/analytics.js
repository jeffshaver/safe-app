import fetch from 'isomorphic-fetch'
import {
  FETCH_ANALYTICS_REQUEST,
  FETCH_ANALYTICS_SUCCESS
} from '../actionTypes'
import {domain, port, protocol} from '../../../config'

export const fetchAnalyticsSuccess = (json) => ({
  data: json.analytics,
  didInvalidate: false,
  isFetching: false,
  recievedAt: Date.now(),
  type: FETCH_ANALYTICS_SUCCESS
})

export const fetchAnalyticsRequest = () => ({
  type: FETCH_ANALYTICS_REQUEST
})

export const fetchAnalytics = (source) =>
  (dispatch) => {
    dispatch(fetchAnalyticsRequest())
    return fetch(`${protocol}://${domain}${port ? ':' + port : ''}/sources/${source}/analytics`)
      .then((response) => response.json(), (err) => console.log(err))
      .then((json) => dispatch(fetchAnalyticsSuccess(json)))
  }