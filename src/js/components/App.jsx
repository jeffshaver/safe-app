import React, {Component} from 'react'
// import {connect} from 'react-redux'
import Radium, {Style} from 'radium'
// import {} from '../actionCreators'
// import Header from './Header'
import {AppBar, AppCanvas} from 'material-ui'
import {DefaultAreaChart, DefaultColumnChart, DefaultLineChart} from 'safe-framework'
// import {Sections} from './Sections'
// import {Footer} from './Footer'

const style = {
  padding: '64px 0 0 0'
}

@Radium
class App extends Component {
  render () {
    return (
      <AppCanvas>
        <Style rules={{
          body: {
            fontFamily: 'Roboto, sans-serif'
          },
          'body *': {
            fontFamily: 'inherit'
          }
        }}/>
        <AppBar
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          title="Title"
        />



      </AppCanvas>
    )
  }
}

export default /* connect() */(App)