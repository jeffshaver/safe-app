import {Banner} from './Banner'
import {CircularProgress} from 'safe-framework'
import {connect} from 'react-redux'
import {fetchUser} from '../modules/user'
import {Footer} from './Footer'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {GlobalStyles} from './GlobalStyles'
import {Header} from './Header'
import {LeftNav} from './LeftNav'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Wrapper} from './Wrapper'
import Radium, {StyleRoot} from 'radium'
import React, {Component, PropTypes} from 'react'

const style = {
  flexWrapper: {
    flex: 1
  },
  loading: {
    wrapper: {
      left: '50%',
      position: 'absolute',
      textAlign: 'center',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '15%'
    }
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
}

@Radium
class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(fetchUser())
  }

  renderLoading () {
    return (
      <div style={[style.loading.wrapper]}>
        <CircularProgress text={''} />
        <h1>Fetching User Data</h1>
      </div>
    )
  }

  renderError (user) {
    return (
      <div style={[style.loading.wrapper]}>
        <h1>{'We couldn\'t authenticate you.'}</h1>
        {(() => {
          if (!user.error) return

          return <span>{user.error.message}</span>
        })()}
      </div>
    )
  }

  renderContent () {
    const {children, user} = this.props

    if (user.isFetching) {
      return this.renderLoading()
    }

    if (user.error || !user.data.authenticated) {
      return this.renderError(user)
    }

    return (
      <div>
        <LeftNav />
        <Wrapper style={style.wrapper}>
          <Banner />
          <Header />
          <div style={style.flexWrapper}>
            {children}
          </div>
          <Footer />
          <Banner />
        </Wrapper>
      </div>
    )
  }

  render () {
    const content = this.renderContent()

    return (
      <StyleRoot>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <GlobalStyles />
            {content}
          </div>
        </MuiThemeProvider>
      </StyleRoot>
    )
  }
}

export default connect((state) => ({
  user: state.user
}))(App)