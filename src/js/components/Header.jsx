import React, {PropTypes} from 'react'
import {red500, white} from 'material-ui/styles/colors'

const style = {
  header: {
    background: red500,
    color: white,
    fontSize: '0.8rem',
    textAlign: 'center'
  }
}

export const Header = ({text}) => {
  if (text === null || text === '') {
    return null
  }

  return (
    <header style={style.header}>{text}</header>
  )
}

Header.propTypes = {
  text: PropTypes.string
}