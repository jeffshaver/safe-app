import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import fetch from 'isomorphic-fetch'
import {
  FETCH_SOURCES_REQUEST,
  FETCH_SOURCES_SUCCESS
} from '../../src/js/actionTypes'
import {
  fetchSources,
  fetchSourcesRequest
} from '../../src/js/actions'
import {domain, port} from '../../config.js'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('datasources actions', () => {
  describe ('sync actions', () => {
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

    it('creates FETCH_SOURCES_SUCCESS action when fetching datasouces has been done', (done) => {
      nock(`https://${domain}${port ? ':' + port : ''}`)
        .get('/sources')
        .reply(200, {sources: ['DataSourceA', 'DataSourceB']})

      const requestAction = {
        type: FETCH_SOURCES_REQUEST
      }
      const recieveAction = (action) => {
        const expectedAction = {
          type: FETCH_SOURCES_SUCCESS,
          data: [
            'DataSourceA',
            'DataSourceB'
          ],
          didInvalidate: false,
          isFetching: false,
          recievedAt: action.recievedAt
        }

        expect(action).toEqual(expectedAction)
      }

      const expectedActions = [
        requestAction,
        recieveAction
      ]
      const store = mockStore({dataSources: []}, expectedActions, done)
      store.dispatch(fetchSources())
    })
  })
})