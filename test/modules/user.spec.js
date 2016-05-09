/* globals afterEach, describe, it */

import {apiUri} from '../../config.js'
import configureStore from 'redux-mock-store'
import expect from 'expect'
import nock from 'nock'
import thunk from 'redux-thunk'
import {
  FAILURE,
  fetchUser,
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
  default as reducer,
  REQUEST,
  SUCCESS
} from '../../src/js/modules/user'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('user actions', () => {
  describe('sync actions', () => {
    it('fetchUserFailure should create a FAILURE action', () => {
      const error = new Error('test error')
      const expectedAction = {
        payload: {error},
        type: FAILURE
      }

      expect(fetchUserFailure(error)).toEqual(expectedAction)
    })
    it('fetchUserRequest should create a REQUEST action', () => {
      const expectedAction = {
        type: REQUEST
      }

      expect(fetchUserRequest()).toEqual(expectedAction)
    })

    it('fetchUserSuccess should create a SUCCESS action', () => {
      const expectedAction = {
        payload: {data: {}},
        receivedAt: null,
        type: SUCCESS
      }
      const action = fetchUserSuccess({})

      expectedAction.receivedAt = action.receivedAt

      expect(action).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('fetchUser creates SUCCESS action on success', (done) => {
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
        receivedAt: null
      }
      const store = mockStore(initialState)

      store.dispatch(fetchUser())
        .then(() => {
          const actions = store.getActions()
          const expectedActions = [
            requestAction,
            recieveAction
          ]

          expectedActions[1].receivedAt = actions[1].receivedAt

          expect(actions).toEqual(expectedActions)
          done()
        })
    })

    it('fetchUser creates a FAILURE action on failure', (done) => {
      nock(apiUri)
        .get('/authenticate')
        .reply(500)

      const initialState = {
        user: {}
      }

      const requestAction = {
        type: REQUEST
      }
      const failureAction = {
        payload: {},
        type: FAILURE
      }
      const store = mockStore(initialState)

      store.dispatch(fetchUser())
        .then(() => {
          const actions = store.getActions()
          const expectedActions = [
            requestAction,
            failureAction
          ]

          expectedActions[1].payload.error = actions[1].payload.error

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
      error: undefined,
      isFetching: false,
      lastUpdated: null
    }

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle FAILURE', () => {
    const error = new Error('test error')
    const action = {
      payload: {error},
      type: FAILURE
    }
    const stateAfter = {
      data: {},
      error,
      isFetching: false,
      lastUpdated: null
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle REQUEST', () => {
    const action = {
      type: REQUEST
    }
    const stateAfter = {
      data: {},
      error: undefined,
      isFetching: true,
      lastUpdated: null
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle SUCCESS', () => {
    const data = {authenticated: true, username: 'unknown'}
    const action = {
      payload: {data},
      receivedAt: Date.now(),
      type: SUCCESS

    }
    const result = reducer(undefined, action)
    const expectedValue = {
      data,
      error: undefined,
      isFetching: false,
      lastUpdated: result.lastUpdated
    }

    expect(result).toEqual(expectedValue)
  })
})