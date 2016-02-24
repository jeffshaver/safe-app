import React, {Component} from 'react'
import {TextField} from 'material-ui'

class Data extends Component {
  render () {
    return (
      <div>
        <h1>Upload a Dataset</h1>
        <TextField type='file' />
      </div>
    )
  }
}

export default Data