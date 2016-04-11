/* globals afterEach, describe, it */

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import {
  FETCH_ANALYTICS_REQUEST,
  FETCH_ANALYTICS_SUCCESS
} from '../../src/js/action-types'
import {
  fetchAnalytics,
  fetchAnalyticsRequest
} from '../../src/js/actions'
import {apiUri} from '../../config.js'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
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
      nock(apiUri)
        .get(`/sources/${source}/analytics`)
        .reply(200, [{_id: '1', name: 'AnalyticA'}, {_id: '2', name: 'AnalyticB'}])

      const initialState = {
        analytics: []
      }

      const requestAction = {
        type: FETCH_ANALYTICS_REQUEST
      }
      const recieveAction = {
        type: FETCH_ANALYTICS_SUCCESS,
        data: [
          {_id: '1', name: 'AnalyticA'},
          {_id: '2', name: 'AnalyticB'}
        ],
        didInvalidate: false,
        isFetching: false,
        recievedAt: null
      }
      const store = mockStore(initialState)
      store.dispatch(fetchAnalytics(source))
        .then(() => {
          const actions = store.getActions()
          const expectedActions = [
            requestAction,
            recieveAction
          ]

          expectedActions[1].recievedAt = actions[1].recievedAt

          expect(actions).toEqual(expectedActions)
          done()
        })
    })
  })
})