import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Radium, {StyleRoot} from 'radium'
import {AppCanvas, CircularProgress} from 'material-ui'
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

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(fetchUser())
  }

  render () {
    const {children, user} = this.props
    let content

    if (user.get('isFetching')) {
      content = (
        <div style={[style.loading.wrapper]}>
          <CircularProgress />
          <h1>Fetching User Data</h1>
        </div>
      )
    } else if (!user.getIn(['data', 'authenticated'])) {
      content = (
        <h1>{'You aren\'t authenticated'}</h1>
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