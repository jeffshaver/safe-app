import React, {Component} from 'react'
import {FileInput} from 'safe-framework'

class Data extends Component {
  render () {
    return (
      <div>
        <h1>Upload a Dataset</h1>
        <FileInput />
      </div>
    )
  }
}

export default Data