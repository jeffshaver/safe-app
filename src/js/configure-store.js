import logger from 'redux-logger'
import {rootReducer} from './modules'
import thunk from 'redux-thunk'
import {applyMiddleware, compose, createStore} from 'redux'

export const configureStore = (initialState) => {
  const middlewares = [thunk]

  if (process.env !== 'production') {
    middlewares.push(logger())
  }

  if (module.hot) {
    module.hot.accept('./modules', () => {
      const nextReducer = require('./modules').rootReducer

      store.replaceReducer(nextReducer)
    })
  }

  const enhancer = compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
  const store = createStore(rootReducer, initialState, enhancer)

  return store
}