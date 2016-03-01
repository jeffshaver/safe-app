import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {MenuItem, SelectField} from 'material-ui'

class SourceSelect extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    sources: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  render () {
    const {
      source,
      sources,
      onChange
    } = this.props

    return (
      <div>
        <h3>Select a data source</h3>
        <SelectField
          floatingLabelText='Select a data source'
          hintText='Select a data source'
          value={source}
          onChange={onChange}
        >
          {sources.data.map((source) => (
            <MenuItem
              key={source}
              primaryText={source}
              value={source}
            />
          ))}
        </SelectField>
      </div>
    )
  }
}

export default connect((state) => ({
  source: state.source,
  sources: state.sources
}))(SourceSelect)