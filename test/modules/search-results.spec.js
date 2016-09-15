/* globals afterEach, describe, it */

import {apiUri} from '../../config.js'
import configureStore from 'redux-mock-store'
import expect from 'expect'
import nock from 'nock'
import thunk from 'redux-thunk'
import {
  FAILURE,
  fetchSearchResults,
  fetchSearchResultsFailure,
  fetchSearchResultsRequest,
  fetchSearchResultsSuccess,
  default as reducer,
  REQUEST,
  RESET,
  resetSearchResults,
  SUCCESS
} from '../../src/js/modules/search-results'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const source = 'SourceA'
const filters = [{id: 0, field: 'Age', operator: '>', value: 20}, {id: 1, field: 'County', operator: '=', value: 'Howard'}]

describe('searchResults actions', () => {
  describe('sync actions', () => {
    it('fetchSearchResultsFailure should create a FAILURE action', () => {
      const error = new Error('test error')
      const expectedAction = {
        payload: {error},
        type: FAILURE
      }

      expect(fetchSearchResultsFailure(error)).toEqual(expectedAction)
    })

    it('fetchSearchResultsRequest should create a REQUEST action', () => {
      const expectedAction = {
        type: REQUEST
      }

      expect(fetchSearchResultsRequest(source, filters)).toEqual(expectedAction)
    })
    
    it('resetSearchResults should create a RESET action', () => {
      const expectedAction = {
        type: RESET
      }

      expect(resetSearchResults()).toEqual(expectedAction)
    })

    it('fetchSearchResultsSuccess should create a SUCCESS action', () => {
      const expectedAction = {
        payload: {data: []},
        receivedAt: null,
        type: SUCCESS
      }
      const action = fetchSearchResultsSuccess([])

      expectedAction.receivedAt = action.receivedAt

      expect(action).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('fetchSearchResults creates a SUCCESS action on success', (done) => {
      nock(apiUri)
        .post(`/sources/${source}/query`)
        .reply(200, [{_id: 1, name: 'John', age: 25, county: 'Howard'}, {_id: 4, name: 'Bob', age: 40, county: 'Howard'}])

      const initialState = {
        searchResults: []
      }
      const requestAction = {
        type: REQUEST
      }
      const recieveAction = {
        type: SUCCESS,
        payload: {
          data: [
            {_id: 1, name: 'John', age: 25, county: 'Howard'},
            {_id: 4, name: 'Bob', age: 40, county: 'Howard'}
          ]
        },
        receivedAt: null
      }
      const store = mockStore(initialState)

      store.dispatch(fetchSearchResults(source, filters))
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

    it('fetchSearchResults creates a FAILURE action on failure', (done) => {
      nock(apiUri)
        .post(`/sources/${source}/query`)
        .reply(500)

      const initialState = {
        searchResults: []
      }

      const requestAction = {
        type: REQUEST
      }
      const failureAction = {
        payload: {},
        type: FAILURE
      }
      const store = mockStore(initialState)

      store.dispatch(fetchSearchResults(source, filters))
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

describe('searchResults reducer', () => {
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
  
  it('should handle RESET', () => {
    const action = {
      type: RESET
    }
    const stateAfter = {
      data: [],
      error: undefined,
      isFetching: false,
      lastUpdated: null
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle SUCCESS', () => {
    const data = [
      {_id: 1, name: 'John', age: 25, county: 'Howard'},
      {_id: 4, name: 'Bob', age: 40, county: 'Howard'}
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