import {bannerText} from '../../../config'
import CircularProgress from 'material-ui/CircularProgress'
import {connect} from 'react-redux'
import {fetchUser} from '../modules/user'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {GlobalStyles} from './GlobalStyles'
import {LeftNav} from './LeftNav'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Wrapper} from './Wrapper'
import {grey800, yellow200} from 'material-ui/styles/colors'
import Radium, {StyleRoot} from 'radium'
import React, {Component, PropTypes} from 'react'

const style = {
  banner: {
    background: grey800,
    color: yellow200,
    fontSize: '0.8rem',
    fontWeight: 400,
    textAlign: 'center'
  },
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

  render () {
    const {children, user} = this.props
    const banner = bannerText
      ? <div style={style.banner}>{bannerText}</div>
      : null
    let content

    if (user.isFetching) {
      content = (
        <div style={[style.loading.wrapper]}>
          <CircularProgress />
          <h1>Fetching User Data</h1>
        </div>
      )
    } else if (user.error || !user.data.authenticated) {
      content = (
        <div style={[style.loading.wrapper]}>
          <h1>{'We couldn\'t authenticate you.'}</h1>
          {(() => {
            if (!user.error) return

            const isNetworkError = user.error.message.indexOf('NetworkError') !== -1
            const message = isNetworkError
              ? user.error.message
              : `NetworkError ${user.error.message}`

            return <span>{message}</span>
          })()}
        </div>
      )
    } else {
      content = (
        <div>
          <LeftNav />
          <Wrapper style={style.wrapper}>
            {banner}
            <div style={style.flexWrapper}>
              {children}
            </div>
            {banner}
          </Wrapper>
        </div>
      )
    }

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