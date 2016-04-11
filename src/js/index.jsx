import React from 'react'
import ReactDOM from 'react-dom'
import {IndexRoute, Router, Route, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Provider} from 'react-redux'
import {configureStore} from './configure-store'
import Analytics from './components/Analytics'
import App from './components/App'
import Home from './components/Home'
import Search from './components/Search'
import Settings from './components/Settings'
import Upload from './components/Upload'

injectTapEventPlugin()

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route
        component={App}
        path='/'
      >
        <IndexRoute component={Home} />
        <Route
          component={Analytics}
          path='analytics'
        />
        <Route
          component={Home}
          path='home'
        />
        <Route
          component={Search}
          path='search'
        />
        <Route
          component={Settings}
          path='settings'
        />
        <Route
          component={Upload}
          path='upload'
        />
      </Route>
      <Route
        component={App}
        path='*'
      />
    </Router>
  </Provider>
), document.querySelector('.app'))