/* globals afterEach, describe, it */

import {apiUri} from '../../config.js'
import configureStore from 'redux-mock-store'
import expect from 'expect'
import nock from 'nock'
import thunk from 'redux-thunk'
import {
  FAILURE,
  fetchVisualizationResults,
  fetchVisualizationResultsFailure,
  fetchVisualizationResultsRequest,
  fetchVisualizationResultsSuccess,
  default as reducer,
  REQUEST,
  SUCCESS
} from '../../src/js/modules/visualization-results'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const id = 'abcdef123456'

describe('visualization-results actions', () => {
  describe('sync actions', () => {
    it('fetchVisualizationResultsFailure should create a FAILURE action', () => {
      const error = new Error('test error')
      const expectedAction = {
        payload: {error, id},
        type: FAILURE
      }

      expect(fetchVisualizationResultsFailure(error, id)).toEqual(expectedAction)
    })

    it('fetchVisualizationResultsRequest should create a REQUEST action', () => {
      const expectedAction = {
        payload: {id},
        type: REQUEST
      }

      expect(fetchVisualizationResultsRequest(id)).toEqual(expectedAction)
    })

    it('fetchVisualizationResultsSuccess should create a SUCCESS action', () => {
      const expectedAction = {
        payload: {data: [], id},
        receivedAt: null,
        type: SUCCESS
      }
      const action = fetchVisualizationResultsSuccess([], id)

      expectedAction.receivedAt = action.receivedAt

      expect(action).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('fetchVisualizationResults creates a SUCCESS action on success', (done) => {
      nock(apiUri)
        .post(`/execute/${id}`)
        .reply(200, [{Value: 'U', Count: 8}, {Value: 'C', Count: 3}])

      const initialState = {
        visualizationResults: {}
      }
      const requestAction = {
        payload: {id},
        type: REQUEST
      }
      const recieveAction = {
        type: SUCCESS,
        payload: {
          data: [
            {Value: 'U', Count: 8},
            {Value: 'C', Count: 3}
          ],
          id
        },
        receivedAt: null
      }
      const store = mockStore(initialState)

      store.dispatch(fetchVisualizationResults(id))
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

    it('fetchVisualizationResults creates a FAILURE action on failure', (done) => {
      nock(apiUri)
        .post(`/execute/${id}`)
        .reply(500)

      const error = new Error('NetworkError')
      const initialState = {
        visualizationResults: {}
      }
      const requestAction = {
        payload: {id},
        type: REQUEST
      }
      const failureAction = {
        payload: {error, id},
        type: FAILURE
      }
      const store = mockStore(initialState)

      store.dispatch(fetchVisualizationResults(id))
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

describe('visualization-results reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {}

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle FAILURE', () => {
    const error = new Error('test error')
    const action = {
      payload: {error, id},
      type: FAILURE
    }
    const stateAfter = {
      [id]: {
        data: [],
        error,
        isFetching: false,
        lastUpdated: null
      }
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle REQUEST', () => {
    const action = {
      payload: {id},
      type: REQUEST
    }
    const stateAfter = {
      [id]: {
        data: [],
        error: undefined,
        isFetching: true,
        lastUpdated: null
      }
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle SUCCESS', () => {
    const data = ['AnalyticA', 'AnalyticB']
    const action = {
      payload: {data, id},
      receivedAt: Date.now(),
      type: SUCCESS
    }
    const result = reducer(undefined, action)
    const expectedValue = {
      [id]: {
        data,
        error: undefined,
        isFetching: false,
        lastUpdated: result.lastUpdated
      }
    }

    expect(result).toEqual(expectedValue)
  })
})