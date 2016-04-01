import React, {Component} from 'react'
import {FileInput} from 'safe-framework'
import {header, main} from '../styles/common'

class Data extends Component {
  render () {
    return (
      <div>
        <header style={header}>
          <h1>Data</h1>
        </header>
        <main style={main}>
          <h1>Upload a Dataset</h1>
          <FileInput />
        </main>
      </div>
    )
  }
}

export default Data