/*
 * This is a decorator that wraps react components. It takes a {String} displayName,
 * and an {Array} of prop keys to be hydrated/dehydrated.
 *
 * Some assumptions are made about how props and hydrate actions are named.
 * props and hydrate actions are camel case:
 *   if your prop is source, than your hydrate action needs to be hydrateSource
 *   if your prop is searchResults, than your hydrate actoin needs to be hydrateSearchResults
 *
 * Usage:
 * @Hydrateable('MyComponent', ['propKey1', 'propKey2'])
 * class MyComponent extends Component {
 *   // rest of class definition
 * }
 */

import {actions} from '../modules/'
import {connect} from 'react-redux'
import {getValueByPath} from '../modules/utilities'
import React, {Component, PropTypes} from 'react'

const localState = {}

export const Hydrateable = (displayName, hydrateableProps, uniquePropPath = '') => {
  return (TargetComponent) => {
    @connect((state) => {
      const stateMap = {}

      hydrateableProps.forEach((prop) => {
        const {[prop]: stateProp} = state

        if (stateProp !== undefined) {
          stateMap[prop] = stateProp
        }
      })

      return stateMap
    })
    class HydrateableComponent extends Component {
      static propTypes = {
        dispatch: PropTypes.func.isRequired
      }

      componentWillMount () {
        this.hydrateProps()
      }

      componentWillUpdate (nextProps, nextState) {
        this.updateStateKey(nextProps)
        this.saveState(nextProps)
      }

      componentWillUnmount () {
        this.saveState()
        this._stateKey = undefined
      }

      hydrateProps () {
        const {dispatch} = this.props

        this.updateStateKey()

        const componentState = localState[this._stateKey] || {}

        hydrateableProps.forEach((prop) => {
          const actionName = `hydrate${prop.charAt(0).toUpperCase()}${prop.substring(1)}`
          const {[prop]: componentStateProp} = componentState

          dispatch(actions[actionName](componentStateProp))
        })
      }

      updateStateKey (currentState = this.props) {
        const uniqueKey = getValueByPath(currentState, uniquePropPath)

        this._stateKey = displayName + (uniqueKey ? `_${uniqueKey}` : '')
      }

      saveState (currentState = this.props) {
        const newLocalState = {}

        hydrateableProps.forEach((prop) => {
          if (currentState[prop] !== undefined) {
            newLocalState[prop] = currentState[prop]
          }
        })

        localState[this._stateKey] = newLocalState
      }

      render () {
        return (
          <TargetComponent
            {...this.props}
          />
        )
      }
    }

    return HydrateableComponent
  }
}