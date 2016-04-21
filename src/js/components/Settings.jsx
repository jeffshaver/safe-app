import {header, main} from '../styles/common'
import React, {Component} from 'react'

class Settings extends Component {
  render () {
    return (
      <div>
        <header style={header}>
          <h1>Settings</h1>
        </header>
        <main style={main}>
          <h3>Admin</h3>
        </main>
      </div>
    )
  }
}

export default Settings