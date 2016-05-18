/*
 * This is a decorator that wraps react components. It takes a {String} groupName,
 * and a {String} displayName.
 *
 * Usage:
 * @LogMetrics('pageView', 'MyPage')
 * class MyComponent extends Component {
 *   // rest of class definition
 * }
 */

import {connect} from 'react-redux'
import {sendMetrics} from '../modules/metrics'
import React, {Component, PropTypes} from 'react'

@connect(({user}) => ({user}))
export const LogMetrics = (groupName, displayName) => {
  return (TargetComponent) => {
    return class MetricsComponent extends Component {
      static propTypes = {
        dispatch: PropTypes.func.isRequired,
        user: PropTypes.object
      }
      
      componentWillMount () {
        const {dispatch, user} = this.props
        const event = {
          group: groupName,
          attributes: {
            page: displayName,
            user: user.data.username
          }
        }
        
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