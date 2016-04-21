import Analytics from './components/Analytics'
import App from './components/App'
import Dashboards from './components/Dashboards'
import Home from './components/Home'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import Search from './components/Search'
import Settings from './components/Settings'
import {store} from './store'
import {syncHistoryWithStore} from 'react-router-redux'
import Upload from './components/Upload'
import {browserHistory, IndexRoute, Route, Router} from 'react-router'

injectTapEventPlugin()

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
          component={Dashboards}
          path='dashboards'
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