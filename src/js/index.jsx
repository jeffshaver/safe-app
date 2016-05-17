import 'babel-polyfill'
import App from './components/App'
import {Home} from './components/Home'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {NotFound} from './components/NotFound'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import {routes} from './constants'
import {store} from './store'
import {syncHistoryWithStore} from 'react-router-redux'
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
        {
          routes.map((route) => {
            if (!route.enabled) return

            return (
              <Route
                component={route.component}
                key={route.name}
                path={route.path}
              />
            )
          })
        }
      </Route>
      <Route
        component={App}
        path='*'
      >
        <IndexRoute component={NotFound} />
      </Route>
    </Router>
  </Provider>
), document.querySelector('.app'))