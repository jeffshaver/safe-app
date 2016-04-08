import React, {Component, PropTypes} from 'react'
import {Map} from 'immutable'
import {connect} from 'react-redux'
import {MenuItem, SelectField} from 'material-ui'

class VisualizationSelect extends Component {
  static propTypes = {
    style: PropTypes.object,
    visualization: PropTypes.string.isRequired,
    visualizations: PropTypes.instanceOf(Map).isRequired,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    style: {}
  }

  render () {
    const {
      style,
      visualization,
      visualizations,
      onChange
    } = this.props

    return (
      <SelectField
        floatingLabelText='Select a visualization'
        hintText='Select a visualization'
        style={style}
        value={visualization}
        onChange={onChange}
      >
        {visualizations.get('data').map((visualization) => (
          <MenuItem
            key={visualization.get('_id')}
            primaryText={visualization.get('name')}
            value={visualization.get('_id')}
          />
        ))}
      </SelectField>
    )
  }
}

export default connect((state) => ({
  visualization: state.visualization,
  visualizations: state.visualizations
}))(VisualizationSelect)