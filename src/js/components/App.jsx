import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Radium, {StyleRoot} from 'radium'
import {AppBar, AppCanvas, CircularProgress} from 'material-ui'
// import {DefaultAreaChart, DefaultColumnChart, DefaultLineChart} from 'safe-framework'
import {Wrapper} from './Wrapper'
import {GlobalStyles} from './GlobalStyles'
import {LeftNav} from './LeftNav'
import {fetchUser} from '../actions'

const style = {
  loading: {
    wrapper: {
      left: '50%',
      position: 'absolute',
      textAlign: 'center',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '15%'
    }
  }
}

@Radium
class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    const {dispatch} = props

    dispatch(fetchUser())
  }

  render () {
    const {children, user} = this.props
    let content

    console.log(user.isFetching)

    if (user.isFetching) {
      content = (
        <div style={[style.loading.wrapper]}>
          <CircularProgress />
          <h1>Fetching User Data</h1>
        </div>
      )
    } else if (!user.data.authenticated) {
      content = (
        <h1>{'You aren\'t authenticated'}</h1>
      )
    } else {
      content = (
        <div>
          <AppBar
            showMenuIconButton = {false}
            title = 'SAFE'
            zDepth = {1}
          />
          <LeftNav />
          <Wrapper>
            {children}
          </Wrapper>
        </div>
      )
    }

    return (
      <StyleRoot>
        <AppCanvas>
          <GlobalStyles />
          {content}
        </AppCanvas>
      </StyleRoot>
    )
  }
}

export default connect((state) => ({
  user: state.user
}))(App)