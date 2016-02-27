import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import fetch from 'isomorphic-fetch'
import {
  FETCH_SOURCE_FIELDS_REQUEST,
  FETCH_SOURCE_FIELDS_SUCCESS
} from '../../src/js/actionTypes'
import {
  fetchSourceFields,
  fetchSourceFieldsRequest
} from '../../src/js/actions'
import {domain, port} from '../../config.js'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const source = 'SourceA'

describe('fields actions', () => {
  describe ('sync actions', () => {
    it('fetchSourceFieldsRequest should create a FETCH_SOURCE_FIELDS_REQUEST action', () => {
      const expectedAction = {
        type: FETCH_SOURCE_FIELDS_REQUEST,
        source: source
      }

      expect(fetchSourceFieldsRequest(source)).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('creates FETCH_SOURCE_FIELDS_SUCCESS action when fetching datasouces has been done', (done) => {
      nock(`https://${domain}${port ? ':' + port : ''}`)
        .get(`/sources/${source}/fields`)
        .reply(200, {fields: ['SourceFieldA', 'SourceFieldB']})

      const requestAction = {
        type: FETCH_SOURCE_FIELDS_REQUEST,
        source: source
      }
      const recieveAction = (action) => {
        const expectedAction = {
          type: FETCH_SOURCE_FIELDS_SUCCESS,
          data: [
            'SourceFieldA',
            'SourceFieldB'
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
      const store = mockStore({sources: []}, expectedActions, done)
      store.dispatch(fetchSourceFields(source))
    })
  })
})