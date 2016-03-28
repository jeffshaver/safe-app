/* globals afterEach, describe, it */

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS
} from '../../src/js/actionTypes'
import {
  fetchUser,
  fetchUserRequest
} from '../../src/js/actions'
import {apiUri} from '../../config.js'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('user actions', () => {
  describe('sync actions', () => {
    it('fetchAnalytics should create a FETCH_ANALYTICS_REQUEST action', () => {
      const expectedAction = {
        type: FETCH_USER_REQUEST
      }

      expect(fetchUserRequest()).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('creates FETCH_USER_SUCCESS action when fetching datasouces has been done', (done) => {
      nock(apiUri)
        .get('/authenticate')
        .reply(200, {authenticated: true, username: 'unknown'})

      const initialState = {
        user: {}
      }

      const requestAction = {
        type: FETCH_USER_REQUEST
      }
      const recieveAction = {
        type: FETCH_USER_SUCCESS,
        data: {
          authenticated: true,
          username: 'unknown'
        },
        didInvalidate: false,
        isFetching: false,
        recievedAt: null
      }
      const store = mockStore(initialState)
      store.dispatch(fetchUser())
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