import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {MenuItem, SelectField} from 'material-ui'

class AnalyticSelect extends Component {
  static propTypes = {
    analytic: PropTypes.string.isRequired,
    analytics: PropTypes.object.isRequired,
    style: PropTypes.object,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    style: {}
  }

  render () {
    const {
      analytic,
      analytics,
      style,
      onChange
    } = this.props

    return (
      <SelectField
        floatingLabelText='Select an analytic'
        hintText='Select an analytic'
        style={style}
        value={analytic}
        onChange={onChange}
      >
        {analytics.data.map((analytic) => (
          <MenuItem
            key={analytic._id}
            primaryText={analytic.name}
            value={analytic._id}
          />
        ))}
      </SelectField>
    )
  }
}

export default connect((state) => ({
  analytic: state.analytic,
  analytics: state.analytics
}))(AnalyticSelect)