import React from 'react'
import {grey800, white} from 'material-ui/styles/colors'
import {headerStyle, headerText} from '../../../config'

const style = {
  header: {
    background: grey800,
    color: white,
    fontSize: '0.8rem',
    textAlign: 'center',
    ...headerStyle
  }
}

export const Header = () => {
  if (headerText === null || headerText === '') {
    return null
  }

  return (
    <header style={style.header}>{headerText}</header>
  )
}
