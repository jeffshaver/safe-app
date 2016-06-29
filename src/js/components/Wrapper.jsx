import Radium from 'radium'
import React, {PropTypes} from 'react'

const style = {
  padding: '0 0 0 110px'
}

export const Wrapper = Radium(({children, style: wrapperStyle}) => (
  <div style={{...style, ...wrapperStyle}}>
    {children}
  </div>
))

Wrapper.propTypes = {
  children: PropTypes.node
}