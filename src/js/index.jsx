import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import thunk from 'redux-thunk'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
//import {} from './reducers'
import App from './components/App'
import Home from './components/Home'
import Search from './components/Search'
import Data from './components/Data'
import Analytics from './components/Analytics'
import Settings from './components/Settings'

injectTapEventPlugin()

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="analytics" component={Analytics}/>
      <Route path="data" component={Data}/>
      <Route path="home" component={Home}/>
      <Route path="search" component={Search}/>
      <Route path="settings" component={Settings}/>
    </Route>
    <Route path="*" component={App}/>
  </Router>
), document.querySelector('.app'))
