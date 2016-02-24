import React, {Component} from 'react'
import {TextField} from 'material-ui'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

class Search extends Component {
  render () {
    return (
      <div>
        <h2>Search</h2>
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
      </div>
    )
  }
}

export default Search