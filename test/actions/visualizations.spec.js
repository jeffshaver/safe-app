import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import fetch from 'isomorphic-fetch'
import {
  FETCH_VISUALIZATIONS_REQUEST,
  FETCH_VISUALIZATIONS_SUCCESS
} from '../../src/js/actionTypes'
import {
  fetchVisualizations,
  fetchVisualizationsRequest
} from '../../src/js/actions'
import {domain, port, protocol} from '../../config.js'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const analytic = 'AnalyticA'

describe('visualizations actions', () => {
  describe ('sync actions', () => {
    it('fetchVisualizations should create a FETCH_VISUALIZATIONS_REQUEST action', () => {
      const expectedAction = {
        type: FETCH_VISUALIZATIONS_REQUEST
      }

      expect(fetchVisualizationsRequest()).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('creates FETCH_VISUALIZATIONS_SUCCESS action when fetching datasouces has been done', (done) => {
      nock(`${protocol}://${domain}${port ? ':' + port : ''}`)
        .get(`/analytics/${analytic}/visualizations`)
        .reply(200, {visualizations: ['VisualizationA', 'VisualizationB']})

      const requestAction = {
        type: FETCH_VISUALIZATIONS_REQUEST
      }
      const recieveAction = (action) => {
        const expectedAction = {
          type: FETCH_VISUALIZATIONS_SUCCESS,
          data: [
            'VisualizationA',
            'VisualizationB'
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
      const store = mockStore({visualizations: []}, expectedActions, done)
      store.dispatch(fetchVisualizations(analytic))
    })
  })
})