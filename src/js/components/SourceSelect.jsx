import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {MenuItem, SelectField} from 'material-ui'

class SourceSelect extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    sources: PropTypes.object.isRequired,
    style: PropTypes.object,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    style: {}
  }

  render () {
    const {
      source,
      sources,
      style,
      onChange
    } = this.props

    return (
      <SelectField
        floatingLabelText='Select a data source'
        hintText='Select a data source'
        style={style}
        value={source}
        onChange={onChange}
      >
        {sources.data.map((source) => (
          <MenuItem
            key={source._id}
            primaryText={source.name}
            value={source._id}
          />
        ))}
      </SelectField>
    )
  }
}

export default connect((state) => ({
  source: state.source,
  sources: state.sources
}))(SourceSelect)