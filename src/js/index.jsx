import 'babel-polyfill'
import App from './components/App'
import {Home} from './components/Home'
import {homeRoute} from '../../config'
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
const generateRoutes = (routeConfig, computeHome) => {
  if (!routeConfig) return null

  const routeNames = Object.keys(routeConfig)
  let homeRouteComponent = null

  if (routeConfig[homeRoute]) {
    const HomeComponent = routeConfig[homeRoute].component

    homeRouteComponent = (
      <IndexRoute
        component={HomeComponent}
        key={'Home'}
      />
    )
  }

  return [
    homeRouteComponent,
    routeNames.map((routeName) => {
      const route = routeConfig[routeName]

      if (!route.enabled) return null

      if (!route.subRoutes) {
        return (
          <Route
            component={route.component}
            key={routeName}
            path={route.path}
          />
        )
      }

      return (
        <Route
          component={route.component}
          key={routeName}
          path={route.path}
        >
          {generateRoutes(route.subRoutes)}
        </Route>
      )
    })
  ]
}

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route
        component={App}
        path='/'
      >
        <IndexRoute component={Home} />
        {generateRoutes(routes)}
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