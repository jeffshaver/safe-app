/* globals afterEach, describe, it */

import {apiUri} from '../../config.js'
import configureStore from 'redux-mock-store'
import expect from 'expect'
import nock from 'nock'
import thunk from 'redux-thunk'
import {
  FAILURE,
  fetchDashboards,
  fetchDashboardsFailure,
  fetchDashboardsRequest,
  fetchDashboardsSuccess,
  default as reducer,
  REQUEST,
  SUCCESS
} from '../../src/js/modules/dashboards'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const source = 'SourceA'

describe('dashboards actions', () => {
  describe('sync actions', () => {
    it('fetchDashboardsFailure should create a FAILURE action', () => {
      const error = new Error('test error')
      const expectedAction = {
        payload: {error},
        type: FAILURE
      }

      expect(fetchDashboardsFailure(error)).toEqual(expectedAction)
    })

    it('fetchDashboardsRequest should create a REQUEST action', () => {
      const expectedAction = {
        type: REQUEST
      }

      expect(fetchDashboardsRequest()).toEqual(expectedAction)
    })

    it('fetchDashboardsSuccess should create a SUCCESS action', () => {
      const expectedAction = {
        payload: {data: []},
        receivedAt: null,
        type: SUCCESS
      }
      const action = fetchDashboardsSuccess([])

      expectedAction.receivedAt = action.receivedAt

      expect(action).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('fetchDashboards creates a SUCCESS action on success', (done) => {
      nock(apiUri)
        .get('/dashboards')
        .reply(200, [
          {_id: 'abc123', subtitle: 'SubtitleA', title: 'TitleA'},
          {_id: 'def456', subtitle: 'SubtitleB', title: 'TitleB'}
        ])

      const initialState = {
        dashboards: []
      }
      const requestAction = {
        type: REQUEST
      }
      const recieveAction = {
        type: SUCCESS,
        payload: {
          data: [
            {_id: 'abc123', subtitle: 'SubtitleA', title: 'TitleA'},
            {_id: 'def456', subtitle: 'SubtitleB', title: 'TitleB'}
          ]
        },
        receivedAt: null
      }
      const store = mockStore(initialState)

      store.dispatch(fetchDashboards(source))
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

    it('fetchDashboards creates a FAILURE action on failure', (done) => {
      nock(apiUri)
        .get('/dashboards')
        .reply(500)

      const error = new Error('NetworkError')
      const initialState = {
        dashboards: []
      }
      const requestAction = {
        type: REQUEST
      }
      const failureAction = {
        payload: {error},
        type: FAILURE
      }
      const store = mockStore(initialState)

      store.dispatch(fetchDashboards())
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

describe('dashboards reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {
      data: [],
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
      data: [],
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
      data: [],
      error: undefined,
      isFetching: true,
      lastUpdated: null
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle SUCCESS', () => {
    const data = ['AnalyticA', 'AnalyticB']
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