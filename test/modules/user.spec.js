/* globals afterEach, describe, it */

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import {
  default as reducer,
  fetchUser,
  fetchUserRequest,
  fetchUserSuccess,
  REQUEST,
  SUCCESS
} from '../../src/js/modules/user'
import {apiUri} from '../../config.js'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('user actions', () => {
  describe('sync actions', () => {
    it('fetchUserRequest should create a REQUEST action', () => {
      const expectedAction = {
        type: REQUEST
      }

      expect(fetchUserRequest()).toEqual(expectedAction)
    })

    it('fetchUserSuccess should create a SUCCESS action', () => {
      const expectedAction = {
        didInvalidate: false,
        isFetching: false,
        payload: {data: {}},
        recievedAt: null,
        type: SUCCESS
      }
      const action = fetchUserSuccess({})

      expectedAction.recievedAt = action.recievedAt

      expect(action).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('fetchUser creates SUCCESS action when done', (done) => {
      nock(apiUri)
        .get('/authenticate')
        .reply(200, {authenticated: true, username: 'unknown'})

      const initialState = {
        user: {}
      }

      const requestAction = {
        type: REQUEST
      }
      const recieveAction = {
        type: SUCCESS,
        payload: {
          data: {
            authenticated: true,
            username: 'unknown'
          }
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

describe('user reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {
      data: {},
      didInvalidate: false,
      isFetching: false,
      lastUpdated: null
    }

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle REQUEST', () => {
    const action = {
      type: REQUEST
    }
    const stateAfter = {
      data: {},
      didInvalidate: false,
      isFetching: true,
      lastUpdated: null
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle SUCCESS', () => {
    const data = {authenticated: true, username: 'unknown'}
    const action = {
      payload: {data},
      didInvalidate: false,
      isFetching: false,
      recievedAt: Date.now(),
      type: SUCCESS

    }
    const result = reducer(undefined, action)
    const expectedValue = {
      data,
      didInvalidate: false,
      isFetching: false,
      lastUpdated: result.lastUpdated
    }

    expect(result).toEqual(expectedValue)
  })
})