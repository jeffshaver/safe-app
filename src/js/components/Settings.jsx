import {applicationName} from '../../../config'
import {LogMetrics} from '../decorators'
import {header, headerAppName, main} from '../styles/common'
import React, {Component} from 'react'

const style = {
  h1: {
    margin: 0
  }
}

@LogMetrics('Settings')
class Settings extends Component {
  render () {
    return (
      <div>
        <header style={header}>
          <p style={headerAppName}>{applicationName}</p>
          <h1 style={style.h1}>Settings</h1>
        </header>
        <main style={main}>
          <h3>Admin</h3>
        </main>
      </div>
    )
  }
}

export default Settings