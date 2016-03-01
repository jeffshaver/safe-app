import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {rootReducer} from './reducers'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

export const configureStore = (initialState) => {
  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').rootReducer

      store.replaceReducer(nextReducer)
    })
  }

  return store
}