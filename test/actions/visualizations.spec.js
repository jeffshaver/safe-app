/* globals afterEach, describe, it */

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'
import {
  FETCH_VISUALIZATIONS_REQUEST,
  FETCH_VISUALIZATIONS_SUCCESS
} from '../../src/js/actionTypes'
import {
  fetchVisualizations,
  fetchVisualizationsRequest
} from '../../src/js/actions'
import {apiUri} from '../../config.js'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const analytic = 'AnalyticA'

describe('visualizations actions', () => {
  describe('sync actions', () => {
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
      nock(apiUri)
        .get(`/analytics/${analytic}/visualizations`)
        .reply(200, {visualizations: ['VisualizationA', 'VisualizationB']})

      const initialState = {
        visualizations: []
      }
      const requestAction = {
        type: FETCH_VISUALIZATIONS_REQUEST
      }
      const recieveAction = {
        type: FETCH_VISUALIZATIONS_SUCCESS,
        data: [
          'VisualizationA',
          'VisualizationB'
        ],
        didInvalidate: false,
        isFetching: false,
        recievedAt: null
      }

      const store = mockStore(initialState)
      store.dispatch(fetchVisualizations(analytic))
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