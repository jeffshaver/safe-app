/* globals afterEach, describe, it */

import {apiUri} from '../../config.js'
import configureStore from 'redux-mock-store'
import expect from 'expect'
import nock from 'nock'
import thunk from 'redux-thunk'
import {
  dashboardFailure,
  dashboardRequest,
  dashboardSuccess,
  deleteDashboard,
  FAILURE,
  default as reducer,
  REQUEST,
  SUCCESS
} from '../../src/js/modules/dashboard'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const dashboardId = 'abc123'

describe('deleteDashboard actions', () => {
  describe('sync actions', () => {
    it('dashboardFailure should create a FAILURE action', () => {
      const error = new Error('test error')
      const expectedAction = {
        payload: {error},
        type: FAILURE
      }

      expect(dashboardFailure(error)).toEqual(expectedAction)
    })

    it('dashboardRequest should create a REQUEST action', () => {
      const expectedAction = {
        type: REQUEST
      }

      expect(dashboardRequest()).toEqual(expectedAction)
    })

    it('dashboardSuccess should create a SUCCESS action', () => {
      const expectedAction = {
        payload: {data: {}},
        receivedAt: null,
        type: SUCCESS
      }
      const action = dashboardSuccess({})

      expectedAction.receivedAt = action.receivedAt

      expect(action).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('deleteDashboard creates a SUCCESS action on success', (done) => {
      nock(apiUri)
        .delete(`/dashboards/${dashboardId}`)
        .reply(200, {})
  
      const requestAction = {
        type: REQUEST
      }
      const recieveAction = {
        type: SUCCESS,
        payload: {
          data: {}
        },
        receivedAt: null
      }
      const store = mockStore({})

      store.dispatch(deleteDashboard(dashboardId))
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

    it('deleteDashboard creates a FAILURE action on failure', (done) => {
      nock(apiUri)
        .delete(`/dashboards/${dashboardId}`)
        .reply(500)

      const error = new Error('NetworkError')
      
      const requestAction = {
        type: REQUEST
      }
      const failureAction = {
        payload: {error},
        type: FAILURE
      }
      const store = mockStore({})

      store.dispatch(deleteDashboard(dashboardId))
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

describe('deleteDashboard reducer', () => {
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
    const data = {}
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