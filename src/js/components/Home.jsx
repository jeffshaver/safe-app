import {applicationName} from '../../../config'
import React from 'react'
import {header, headerAppName} from '../styles/common'

const style = {
  h1: {
    margin: 0
  }
}

export const Home = () => (
  <div>
    <header style={header}>
      <p style={headerAppName}>{applicationName}</p>
      <h1 style={style.h1} >Home</h1>
    </header>
  </div>
)