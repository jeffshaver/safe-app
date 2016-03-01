import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {MenuItem, SelectField} from 'material-ui'

class AnalyticSelect extends Component {
  static propTypes = {
    analytic: PropTypes.string.isRequired,
    analytics: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  render () {
    const {
      analytic,
      analytics,
      onChange
    } = this.props

    return (
      <div>
        <h3>Select an analytic</h3>
        <SelectField
          floatingLabelText='Select an analytic'
          hintText='Select an analytic'
          value={analytic}
          onChange={onChange}
        >
          {analytics.data.map((analytic) => (
            <MenuItem
              key={analytic}
              primaryText={analytic}
              value={analytic}
            />
          ))}
        </SelectField>
      </div>
    )
  }
}

export default connect((state) => ({
  analytic: state.analytic,
  analytics: state.analytics
}))(AnalyticSelect)