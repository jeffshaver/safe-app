/* globals window */

import {compose, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {rootReducer} from './reducers'

const enhancer = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)

export const configureStore = (initialState) => {
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').rootReducer

      store.replaceReducer(nextReducer)
    })
  }

  return store
}