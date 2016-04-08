import React, {Component, PropTypes} from 'react'
import {Map} from 'immutable'
import {connect} from 'react-redux'
import {MenuItem, SelectField} from 'material-ui'

class AnalyticSelect extends Component {
  static propTypes = {
    analytic: PropTypes.string.isRequired,
    analytics: PropTypes.instanceOf(Map),
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
        {analytics.get('data').map((analytic) => (
          <MenuItem
            key={analytic.get('_id')}
            primaryText={analytic.get('name')}
            value={analytic.get('_id')}
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