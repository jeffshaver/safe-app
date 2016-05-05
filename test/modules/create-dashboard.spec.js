/* globals afterEach, describe, it */

import {apiUri} from '../../config.js'
import configureStore from 'redux-mock-store'
import {REQUEST as DASHBOARDS_REQUEST} from '../../src/js/modules/dashboards'
import expect from 'expect'
import nock from 'nock'
import thunk from 'redux-thunk'
import {
  createDashboard,
  createDashboardFailure,
  createDashboardRequest,
  createDashboardSuccess,
  FAILURE,
  default as reducer,
  REQUEST,
  SUCCESS
} from '../../src/js/modules/create-dashboard'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('createDashboard actions', () => {
  describe('sync actions', () => {
    it('createDashboardFailure should create a FAILURE action', () => {
      const error = new Error('test error')
      const expectedAction = {
        payload: {error},
        type: FAILURE
      }

      expect(createDashboardFailure(error)).toEqual(expectedAction)
    })

    it('createDashboardRequest should create a REQUEST action', () => {
      const expectedAction = {
        type: REQUEST
      }

      expect(createDashboardRequest()).toEqual(expectedAction)
    })

    it('createDashboardSuccess should create a SUCCESS action', () => {
      const expectedAction = {
        payload: {data: {}},
        recievedAt: null,
        type: SUCCESS
      }
      const action = createDashboardSuccess({})

      expectedAction.recievedAt = action.recievedAt

      expect(action).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('createDashboard creates a SUCCESS action on success', (done) => {
      nock(apiUri)
        .post('/dashboards')
        .reply(200, {_id: 'abc123', subtitle: 'Subtitle', title: 'Title'})

      const subtitle = 'Subtitle'
      const title = 'Title'
      const requestAction = {
        type: REQUEST
      }
      const recieveAction = {
        type: SUCCESS,
        payload: {
          data: {_id: 'abc123', subtitle, title}
        },
        recievedAt: null
      }
      const dashboardsRequestAction = {
        type: DASHBOARDS_REQUEST
      }
      const store = mockStore({})

      store.dispatch(createDashboard(subtitle, title))
        .then(() => {
          const actions = store.getActions()
          const expectedActions = [
            requestAction,
            recieveAction,
            dashboardsRequestAction
          ]

          expectedActions[1].recievedAt = actions[1].recievedAt

          // call slice because we need to weed out the request that comes from another module

          expect(actions).toEqual(expectedActions)
          done()
        })
    })

    it('createDashboard creates a FAILURE action on failure', (done) => {
      nock(apiUri)
        .get('/dashboards')
        .reply(500)

      const subtitle = 'Subtitle'
      const title = 'Title'
      const error = new Error('NetworkError')
      const requestAction = {
        type: REQUEST
      }
      const failureAction = {
        payload: {error},
        type: FAILURE
      }
      const store = mockStore({})

      store.dispatch(createDashboard(subtitle, title))
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

describe('createDashboard reducer', () => {
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
    const data = {_id: 'abc123', subtitle: 'Subtitle', title: 'Title'}
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