import React, {Component} from 'react'
import {TextField} from 'material-ui'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'
import {header, main} from '../styles/common'

class Search extends Component {
  render () {
    return (
      <div>
        <header style={header}>
          <h1>Search</h1>
        </header>
        <main style={main}>
          <h3>Select a data source</h3>
          <h3>Select filter criteria (optional)</h3>
          <TextField
            floatingLabelText='Filter Criteria'
            hintText='Filter Criteria'
          />
          <FloatingActionButton
            mini={true}
            secondary={true}
          >
            <ContentAdd />
          </FloatingActionButton>
        </main>
      </div>
    )
  }
}

export default Search