/* globals afterEach, describe, it */

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import {
  FETCH_SOURCES_REQUEST,
  FETCH_SOURCES_SUCCESS
} from '../../src/js/action-types'
import {
  fetchSources,
  fetchSourcesRequest
} from '../../src/js/actions'
import {apiUri} from '../../config.js'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('sources actions', () => {
  describe('sync actions', () => {
    it('fetchSources should create a FETCH_SOURCES_REQUEST action', () => {
      const expectedAction = {
        type: FETCH_SOURCES_REQUEST
      }

      expect(fetchSourcesRequest()).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('creates FETCH_SOURCES_SUCCESS action when fetching souces has been done', (done) => {
      nock(apiUri)
        .get('/sources')
        .reply(200, [{_id: '1', name: 'SourceA'}, {_id: '2', name: 'SourceB'}])

      const initialState = {
        sources: []
      }
      const requestAction = {
        type: FETCH_SOURCES_REQUEST
      }
      const recieveAction = {
        type: FETCH_SOURCES_SUCCESS,
        data: [
          {_id: '1', name: 'SourceA'},
          {_id: '2', name: 'SourceB'}
        ],
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