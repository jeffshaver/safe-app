/* globals afterEach, describe, it */

import {apiUri} from '../../config.js'
import configureStore from 'redux-mock-store'
import expect from 'expect'
import nock from 'nock'
import thunk from 'redux-thunk'
import {
  FAILURE,
  fetchVisualizationTypes,
  fetchVisualizationTypesFailure,
  fetchVisualizationTypesRequest,
  fetchVisualizationTypesSuccess,
  default as reducer,
  REQUEST,
  SUCCESS
} from '../../src/js/modules/visualization-types'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const analytic = 'AnalyticA'

describe('visualizationTypes actions', () => {
  describe('sync actions', () => {
    it('fetchVisualizationTypesFailure should create a FAILURE action', () => {
      const error = new Error('test error')
      const expectedAction = {
        payload: {error},
        type: FAILURE
      }

      expect(fetchVisualizationTypesFailure(error)).toEqual(expectedAction)
    })

    it('fetchVisualizationTypesRquest should create a REQUEST action', () => {
      const expectedAction = {
        type: REQUEST
      }

      expect(fetchVisualizationTypesRequest()).toEqual(expectedAction)
    })

    it('fetchVisualizationTypesSuccess should create a SUCCESS action', () => {
      const expectedAction = {
        payload: {data: []},
        receivedAt: null,
        type: SUCCESS
      }
      const action = fetchVisualizationTypesSuccess([])

      expectedAction.receivedAt = action.receivedAt

      expect(action).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('fetchVisualizationTypes creates a SUCCESS action on success', (done) => {
      nock(apiUri)
        .get(`/analytics/${analytic}/visualization-types`)
        .reply(200, [{_id: '1', name: 'VisualizationA'}, {_id: '2', name: 'VisualizationB'}])

      const initialState = {
        visualizationTypes: []
      }
      const requestAction = {
        type: REQUEST
      }
      const recieveAction = {
        type: SUCCESS,
        payload: {
          data: [
            {_id: '1', name: 'VisualizationA'},
            {_id: '2', name: 'VisualizationB'}
          ]
        },
        receivedAt: null
      }
      const store = mockStore(initialState)

      store.dispatch(fetchVisualizationTypes(analytic))
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

    it('fetchVisualizationTypes creates a FAILURE action on failure', (done) => {
      nock(apiUri)
        .get(`/analytics/${analytic}/visualization-types`)
        .reply(500)

      const initialState = {
        visualizationTypes: {}
      }

      const requestAction = {
        type: REQUEST
      }
      const failureAction = {
        payload: {},
        type: FAILURE
      }
      const store = mockStore(initialState)

      store.dispatch(fetchVisualizationTypes())
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

describe('visualizationTypes reducer', () => {
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
    const data = ['VisualizationA', 'VisualizationB']
    const action = {
      payload: {data},
      receivedAt: Date.now(),
      type: SUCCESS
    }
    const result = reducer(undefined, action)
    const stateAfter = {
      data,
      error: undefined,
      isFetching: false,
      lastUpdated: result.lastUpdated
    }

    expect(result).toEqual(stateAfter)
  })
})