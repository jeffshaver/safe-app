/* globals afterEach, describe, it */

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import {
  default as reducer,
  fetchSources,
  fetchSourcesRequest,
  fetchSourcesSuccess,
  REQUEST,
  SUCCESS
} from '../../src/js/modules/sources'
import {apiUri} from '../../config.js'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('sources actions', () => {
  describe('sync actions', () => {
    it('request should create a REQUEST action', () => {
      const expectedAction = {
        type: REQUEST
      }

      expect(fetchSourcesRequest()).toEqual(expectedAction)
    })

    it('success should create a SUCCESS action', () => {
      const expectedAction = {
        didInvalidate: false,
        isFetching: false,
        payload: {data: []},
        recievedAt: null,
        type: SUCCESS
      }
      const action = fetchSourcesSuccess([])

      expectedAction.recievedAt = action.recievedAt

      expect(action).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('fetchSources creates a SUCCESS action when done', (done) => {
      nock(apiUri)
        .get('/sources')
        .reply(200, [{_id: '1', name: 'SourceA'}, {_id: '2', name: 'SourceB'}])

      const initialState = {
        sources: []
      }
      const requestAction = {
        type: REQUEST
      }
      const recieveAction = {
        type: SUCCESS,
        payload: {
          data: [
            {_id: '1', name: 'SourceA'},
            {_id: '2', name: 'SourceB'}
          ]
        },
        didInvalidate: false,
        isFetching: false,
        recievedAt: null
      }
      const store = mockStore(initialState)
      store.dispatch(fetchSources())
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

describe('sources reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {
      data: [],
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
      data: [],
      didInvalidate: false,
      isFetching: true,
      lastUpdated: null
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle SUCCESS', () => {
    const data = ['SourceA', 'SourceB']
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