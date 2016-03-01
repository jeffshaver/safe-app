import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {MenuItem, SelectField} from 'material-ui'

class VisualizationSelect extends Component {
  static propTypes = {
    visualization: PropTypes.string.isRequired,
    visualizations: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  render () {
    const {
      visualization,
      visualizations,
      onChange
    } = this.props

    return (
      <div>
        <h3>Select a visualization</h3>
        <SelectField
          floatingLabelText='Select a visualization'
          hintText='Select a visualization'
          value={visualization}
          onChange={onChange}
        >
          {visualizations.data.map((visualization) => (
            <MenuItem
              key={visualization}
              primaryText={visualization}
              value={visualization}
            />
          ))}
        </SelectField>
      </div>
    )
  }
}

export default connect((state) => ({
  visualization: state.visualization,
  visualizations: state.visualizations
}))(VisualizationSelect)