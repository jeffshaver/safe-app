import React, {PropTypes} from 'react'
import Radium from 'radium'
import {large} from '../styles/mediaQueries'

const style = {
  padding: '0 0 0 175px',
  [large]: {
    padding: '0 0 0 175px'
  }
}

export const Wrapper = Radium(({children}) => (
  <div style={style}>
    {children}
  </div>
))

Wrapper.propTypes = {
  children: PropTypes.node
}