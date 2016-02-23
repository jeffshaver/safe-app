import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Provider} from 'react-redux'
import {rootReducer} from './reducers'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import App from './components/App'
import Home from './components/Home'
import Search from './components/Search'
import Data from './components/Data'
import Analytics from './components/Analytics'
import Settings from './components/Settings'

injectTapEventPlugin()

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

const store = createStoreWithMiddleware(rootReducer)
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="analytics" component={Analytics}/>
        <Route path="data" component={Data}/>
        <Route path="home" component={Home}/>
        <Route path="search" component={Search}/>
        <Route path="settings" component={Settings}/>
      </Route>
      <Route path="*" component={App}/>
    </Router>
  </Provider>
), document.querySelector('.app'))
