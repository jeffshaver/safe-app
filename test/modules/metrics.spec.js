/* globals afterEach, describe, it */

import {apiUri} from '../../config.js'
import configureStore from 'redux-mock-store'
import expect from 'expect'
import nock from 'nock'
import thunk from 'redux-thunk'
import {
  FAILURE,
  default as reducer,
  REQUEST,
  sendMetrics,
  sendMetricsFailure,
  sendMetricsRequest,
  sendMetricsSuccess,
  SUCCESS
} from '../../src/js/modules/metrics'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const events = [
  {group: 'pageView', account: '1234567890', attributes: {page: 'Search', user: 'user1'}},
  {group: 'pageView', account: '1234567890', attributes: {page: 'Analytics', user: 'user1'}}
]

describe('metrics actions', () => {
  describe('sync actions', () => {
    it('sendMetricsFailure should create a FAILURE action', () => {
      const error = new Error('test error')
      const expectedAction = {
        payload: {error},
        type: FAILURE
      }

      expect(sendMetricsFailure(error)).toEqual(expectedAction)
    })

    it('sendMetricsRequest should create a REQUEST action', () => {
      const expectedAction = {
        type: REQUEST
      }

      expect(sendMetricsRequest(events)).toEqual(expectedAction)
    })

    it('sendMetricsSuccess should create a SUCCESS action', () => {
      const expectedAction = {
        payload: {data: []},
        receivedAt: null,
        type: SUCCESS
      }
      const action = sendMetricsSuccess([])

      expectedAction.receivedAt = action.receivedAt
      
      expect(action).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('sendMetrics creates a SUCCESS action on success', (done) => {
      nock(apiUri)
        .post('/metrics')
        .reply(200, [
                      {group: 'pageView', account: '1234567890', attributes: {page: 'Search', user: 'user1'}},
                      {group: 'pageView', account: '1234567890', attributes: {page: 'Analytics', user: 'user1'}}
        ])

      const initialState = {
        data: []
      }
      const requestAction = {
        type: REQUEST
      }
      const receiveAction = {
        type: SUCCESS,
        payload: {
          data: [
            {group: 'pageView', account: '1234567890', attributes: {page: 'Search', user: 'user1'}},
            {group: 'pageView', account: '1234567890', attributes: {page: 'Analytics', user: 'user1'}}
          ]
        },
        receivedAt: null
      }
      const store = mockStore(initialState)
      
      store.dispatch(sendMetrics(events))
        .then(() => {
          const actions = store.getActions()
          const expectedActions = [
            requestAction,
            receiveAction
          ]

          expectedActions[1].receivedAt = actions[1].receivedAt
          expect(actions).toEqual(expectedActions)
          done()
        })
    })

    it('sendMetrics creates a FAILURE action on failure', (done) => {
      nock(apiUri)
        .post('/metrics')
        .reply(500)
        
      const error = new Error('NetworkError')
      const initialState = {
        data: []
      }
      const requestAction = {
        type: REQUEST
      }
      const failureAction = {
        payload: {error},
        type: FAILURE
      }
      const store = mockStore(initialState)

      store.dispatch(sendMetrics(events))
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

describe('metrics reducer', () => {
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
    const data = [
      {group: 'pageView', account: '1234567890', attributes: {page: 'Search', user: 'user1'}},
      {group: 'pageView', account: '1234567890', attributes: {page: 'Analytics', user: 'user1'}}
    ]
    
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