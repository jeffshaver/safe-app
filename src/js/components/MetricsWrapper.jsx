import {connect} from 'react-redux'
import {sendMetrics} from '../modules/metrics'
import React, {Component, PropTypes} from 'react'

class MetricsWrapper extends Component {
  static propTypes = {
    component: PropTypes.node,
    data: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    label: PropTypes.string,
    user: PropTypes.object,
    onTouchTap: PropTypes.func
  }

  constructor (props) {
    super(props)
    
    this.handleTouchTap = ::this.handleTouchTap
  }

  handleTouchTap (event) {
    const {data, dispatch, label, onTouchTap, user} = this.props
    
    onTouchTap(event)
    
    const metrics = {
      group: label,
      attributes: {
        DN: user.data.dn,
        email: user.data.emailaddress,
        sid: user.data.username
      }
    }
    
    Object.keys(data).map(function (key, index) {
      metrics.attributes[key] = data[key]
    })
    
    dispatch(sendMetrics([metrics]))
  }
  
  render () {
    const {component} = this.props
    
    return (
      <span>
        {
          React.cloneElement(component, {
            onTouchTap: this.handleTouchTap
          })
        }
      </span>
    )
  }
}

export default connect((state) => ({
  user: state.user
}))(MetricsWrapper)