import {connect} from 'react-redux'
import {fetchUser} from '../modules/user'
import {GlobalStyles} from './GlobalStyles'
import {LeftNav} from './LeftNav'
import {Wrapper} from './Wrapper'
import {AppCanvas, CircularProgress} from 'material-ui'
import Radium, {StyleRoot} from 'radium'
import React, {Component, PropTypes} from 'react'

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

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(fetchUser())
  }

  render () {
    const {children, user} = this.props
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

            const isNetworkError = user.error.message.contains('NetworkError')
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