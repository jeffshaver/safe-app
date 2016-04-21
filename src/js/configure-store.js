/* globals window */

import {rootReducer} from './modules'
import thunk from 'redux-thunk'
import {applyMiddleware, compose, createStore} from 'redux'

const enhancer = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)

export const configureStore = (initialState) => {
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('./modules', () => {
      const nextReducer = require('./modules').rootReducer

      store.replaceReducer(nextReducer)
    })
  }

  return store
}