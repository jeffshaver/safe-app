import React, {Component, PropTypes} from 'react'
import Radium from 'radium'
import {AppBar, AppCanvas} from 'material-ui'
// import {DefaultAreaChart, DefaultColumnChart, DefaultLineChart} from 'safe-framework'

import {GlobalStyles} from './GlobalStyles'
import {LeftNav} from './LeftNav'
import {large} from '../styles/mediaQueries'

const style = {
  padding: '74px 0 0 0',
  wrapper: {
    padding: '64px 0 0 100px',
    [large]: {
      padding: '64px 0 0 100px'
    }
  }
}

@Radium
class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    const {children} = this.props

    return (
      <AppCanvas>
        <GlobalStyles />
        <AppBar
          showMenuIconButton = {false}
          title = 'SAFE'
          zDepth = {1}
        />
        <LeftNav />
        <div style={style.wrapper}>
          {children}
        </div>
      </AppCanvas>
    )
  }
}

export default App