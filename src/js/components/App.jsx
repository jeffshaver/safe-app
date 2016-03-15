import React, {Component, PropTypes} from 'react'
import Radium, {StyleRoot} from 'radium'
import {AppBar, AppCanvas} from 'material-ui'
// import {DefaultAreaChart, DefaultColumnChart, DefaultLineChart} from 'safe-framework'
import {Wrapper} from './Wrapper'
import {GlobalStyles} from './GlobalStyles'
import {LeftNav} from './LeftNav'

@Radium
class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    const {children} = this.props

    return (
      <StyleRoot>
        <AppCanvas>
          <GlobalStyles />
          <AppBar
            showMenuIconButton = {false}
            title = 'SAFE'
            zDepth = {1}
          />
          <LeftNav />
          <Wrapper>
            {children}
          </Wrapper>
        </AppCanvas>
      </StyleRoot>
    )
  }
}

export default App