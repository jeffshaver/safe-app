/* globals afterEach, describe, it */

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import {
  FETCH_ANALYTICS_REQUEST,
  FETCH_ANALYTICS_SUCCESS
} from '../../src/js/actionTypes'
import {
  fetchAnalytics,
  fetchAnalyticsRequest
} from '../../src/js/actions'
import {domain, port, protocol} from '../../config.js'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const source = 'SourceA'

describe('analytics actions', () => {
  describe('sync actions', () => {
    it('fetchAnalytics should create a FETCH_ANALYTICS_REQUEST action', () => {
      const expectedAction = {
        type: FETCH_ANALYTICS_REQUEST
      }

      expect(fetchAnalyticsRequest()).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('creates FETCH_ANALYTICS_SUCCESS action when fetching datasouces has been done', (done) => {
      nock(`${protocol}://${domain}${port ? ':' + port : ''}`)
        .get(`/sources/${source}/analytics`)
        .reply(200, {analytics: ['AnalyticA', 'AnalyticB']})

      const requestAction = {
        type: FETCH_ANALYTICS_REQUEST
      }
      const recieveAction = (action) => {
        const expectedAction = {
          type: FETCH_ANALYTICS_SUCCESS,
          data: [
            'AnalyticA',
            'AnalyticB'
          ],
          didInvalidate: false,
          isFetching: false,
          recievedAt: action.recievedAt
        }

        expect(action).toEqual(expectedAction)
      }

      const expectedActions = [
        requestAction,
        recieveAction
      ]
      const store = mockStore({analytics: []}, expectedActions, done)
      store.dispatch(fetchAnalytics(source))
    })
  })
})