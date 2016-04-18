/* globals afterEach, describe, it */

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import {
  default as reducer,
  fetchSearchResults,
  fetchSearchResultsRequest,
  fetchSearchResultsSuccess,
  REQUEST,
  SUCCESS
} from '../../src/js/modules/search-results'
import {apiUri} from '../../config.js'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const source = 'SourceA'
const filters = [{id: 0, field: 'Age', operator: '>', value: '30'}, {id: 1, field: 'County', operator: '=', value: 'Howard'}]

describe('searchResults actions', () => {
  describe('sync actions', () => {
    it('request should create a REQUEST action', () => {
      const expectedAction = {
        type: REQUEST,
        payload: {filters, source}
      }

      expect(fetchSearchResultsRequest(source, filters)).toEqual(expectedAction)
    })

    it('success should create a SUCCESS action', () => {
      const expectedAction = {
        didInvalidate: false,
        isFetching: false,
        payload: {data: []},
        recievedAt: null,
        type: SUCCESS
      }
      const action = fetchSearchResultsSuccess([])

      expectedAction.recievedAt = action.recievedAt

      expect(action).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('fetchSearchResults creates a SUCCESS action when done', (done) => {
      nock(apiUri)
        .post(`/search/${source}`)
        .reply(200, [{_id: 1, name: 'John', age: '25', county: 'Howard'}, {_id: 4, name: 'Bob', age: '40', county: 'Howard'}])

      const initialState = {
        searchResults: []
      }
      const requestAction = {
        type: REQUEST,
        payload: {filters, source}
      }
      const recieveAction = {
        type: SUCCESS,
        payload: {
          data: [
            {_id: 1, name: 'John', age: '25', county: 'Howard'},
            {_id: 4, name: 'Bob', age: '40', county: 'Howard'}
          ]
        },
        didInvalidate: false,
        isFetching: false,
        recievedAt: null
      }
      const store = mockStore(initialState)

      store.dispatch(fetchSearchResults(source, filters))
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

describe('searchResults reducer', () => {
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
    const data = [
      {_id: 1, name: 'John', age: 25, county: 'Howard'},
      {_id: 4, name: 'Bob', age: 40, county: 'Howard'}
    ]
    const action = {
      payload: {data},
      didInvalidate: false,
      isFetching: false,
      recievedAt: Date.now(),
      type: SUCCESS
    }
    const result = reducer(undefined, action)
    const stateAfter = {
      data,
      didInvalidate: false,
      isFetching: false,
      lastUpdated: result.lastUpdated
    }

    expect(result).toEqual(stateAfter)
  })
})