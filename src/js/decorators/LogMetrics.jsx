/*
 * This is a decorator that wraps react components. It takes a {String} displayName
 * and an {Array} of prop paths that will be looked up to retrieve the property value
 * which is appended to the displayName.
 *
 * Usage:
 * @LogMetrics('MyComponent', ['MyComponent.prop1', 'MyComponent.prop2'])
 * class MyComponent extends Component {
 *   // rest of class definition
 * }
 */

import {connect} from 'react-redux'
import {getValueByPath} from '../modules/utilities'
import {sendMetrics} from '../modules/metrics'
import React, {Component, PropTypes} from 'react'

@connect(({user}) => ({user}))
export const LogMetrics = (displayName, uniqueProps = []) => {
  return (TargetComponent) => {
    return class MetricsComponent extends Component {
      static propTypes = {
        dispatch: PropTypes.func.isRequired,
        user: PropTypes.object
      }
      
      componentWillMount () {
        const {dispatch, user} = this.props
        const event = {
          attributes: {
            DN: user.data.dn,
            email: user.data.emailaddress,
            sid: user.data.username
          }
        }
        
        let group = displayName
        
        uniqueProps.forEach((prop) => {
          const uniqueKey = getValueByPath(this.props, prop)
            
          group += uniqueKey ? `_${uniqueKey}` : ''
        })
          
        event.group = group
        
        dispatch(sendMetrics([event]))
      }

      render () {
        return (
          <TargetComponent
            {...this.props}
          />
        )
      }
    }
  }
}