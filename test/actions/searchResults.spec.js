/* globals afterEach, describe, it */

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import {
  FETCH_SEARCH_RESULTS_REQUEST,
  FETCH_SEARCH_RESULTS_SUCCESS
} from '../../src/js/actionTypes'
import {
  fetchSearchResults,
  fetchSearchResultsRequest
} from '../../src/js/actions'
import {apiUri} from '../../config.js'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const source = 'SourceA'
const filters = [{id: 0, field: 'Age', operator: '>', value: '30'}, {id: 1, field: 'County', operator: '=', value: 'Howard'}]

describe('searchResults actions', () => {
  describe('sync actions', () => {
    it('fetchSearchResults should create a FETCH_SEARCH_RESULTS_REQUEST action', () => {
      const expectedAction = {
        type: FETCH_SEARCH_RESULTS_REQUEST,
        source: source,
        filters: filters
      }

      expect(fetchSearchResultsRequest(source, filters)).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('creates FETCH_SEARCH_RESULTS_SUCCESS action when fetching search results has been done', (done) => {
      nock(apiUri)
        .post(`/search/${source}`)
        .reply(200, [{_id: 1, name: 'John', age: '25', county: 'Howard'}, {_id: 4, name: 'Bob', age: '40', county: 'Howard'}])

      const initialState = {
        searchResults: []
      }

      const requestAction = {
        type: FETCH_SEARCH_RESULTS_REQUEST,
        source: source,
        filters: filters
      }
      const recieveAction = {
        type: FETCH_SEARCH_RESULTS_SUCCESS,
        data: [
          {_id: 1, name: 'John', age: '25', county: 'Howard'},
          {_id: 4, name: 'Bob', age: '40', county: 'Howard'}
        ],
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