import React, {PropTypes} from 'react'

const style = {
  padding: '0 0 0 110px'
}

export const Wrapper = ({children, style: wrapperStyle}) => (
  <div style={{...style, ...wrapperStyle}}>
    {children}
  </div>
)

Wrapper.defaultProps = {
  style: {}
}

Wrapper.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}