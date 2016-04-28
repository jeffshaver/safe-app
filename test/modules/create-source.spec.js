/* globals afterEach, describe, it */

import {apiUri} from '../../config.js'
import configureStore from 'redux-mock-store'
import {DO_NEW_SOURCE_SAVED} from '../../src/js/modules/uploads'
import expect from 'expect'
import nock from 'nock'
import thunk from 'redux-thunk'
import {
  createSource,
  createSourceFailure,
  createSourceRequest,
  createSourceSuccess,
  FAILURE,
  default as reducer,
  REQUEST,
  RESET,
  resetNewSource,
  SUCCESS
} from '../../src/js/modules/create-source'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('createSource actions', () => {
  describe('sync actions', () => {
    it('createSourceFailure should create a FAILURE action', () => {
      const error = new Error('test error')
      const expectedAction = {
        payload: {error},
        type: FAILURE
      }

      expect(createSourceFailure(error)).toEqual(expectedAction)
    })

    it('createSourceRequest should create a REQUEST action', () => {
      const expectedAction = {
        type: REQUEST
      }

      expect(createSourceRequest()).toEqual(expectedAction)
    })

    it('createSourceSuccess should create a SUCCESS action', () => {
      const expectedAction = {
        payload: {data: {}},
        recievedAt: null,
        type: SUCCESS
      }
      const action = createSourceSuccess({})

      expectedAction.recievedAt = action.recievedAt

      expect(action).toEqual(expectedAction)
    })
    
    it('resetNewSource should create a RESET action', () => {
      const expectedAction = {
        type: RESET
      }

      expect(resetNewSource()).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('createSource creates a SUCCESS action on success', (done) => {
      nock(apiUri)
        .post('/sources')
        .reply(200, {_id: 'abc123', name: 'Name'})

      const name = 'Name'
      const requestAction = {
        type: REQUEST
      }
      const receiveAction = {
        type: SUCCESS,
        payload: {
          data: {_id: 'abc123', name}
        },
        recievedAt: null
      }
      const sourceSavedAction = {
        type: DO_NEW_SOURCE_SAVED,
        payload: true
      }
      const store = mockStore({})

      store.dispatch(createSource(name))
        .then(() => {
          const actions = store.getActions()
          const expectedActions = [
            requestAction,
            receiveAction,
            sourceSavedAction
          ]

          expectedActions[1].recievedAt = actions[1].recievedAt

          expect(actions).toEqual(expectedActions)
          done()
        })
    })

    it('createSource creates a FAILURE action on failure', (done) => {
      nock(apiUri)
        .post('/sources')
        .reply(500)

      const name = 'Name'
      const error = new Error('NetworkError')
      const requestAction = {
        type: REQUEST
      }
      const failureAction = {
        payload: {error},
        type: FAILURE
      }
      const sourceNotSavedAction = {
        type: DO_NEW_SOURCE_SAVED,
        payload: false
      }
      const store = mockStore({})

      store.dispatch(createSource(name))
        .then(() => {
          const actions = store.getActions()
          const expectedActions = [
            requestAction,
            failureAction,
            sourceNotSavedAction
          ]

          expectedActions[1].payload.error = actions[1].payload.error

          expect(actions).toEqual(expectedActions)
          done()
        })
    })
  })
})

describe('createSource reducer', () => {
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

  it('should handle RESET', () => {
    const action = {
      type: RESET
    }
    const stateAfter = {
      data: {},
      error: undefined,
      isFetching: false,
      lastUpdated: null
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle SUCCESS', () => {
    const data = {_id: 'abc123', name: 'Name'}
    const action = {
      payload: {data},
      recievedAt: Date.now(),
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