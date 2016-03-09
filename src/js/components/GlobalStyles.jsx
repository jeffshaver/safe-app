import React from 'react'
import {Style} from 'radium'

export const GlobalStyles = () => (
  <Style rules={{
    body: {
      fontFamily: 'Roboto, sans-serif'
    },
    'body *': {
      fontFamily: 'inherit'
    },
    'h1, h2, h3, h4': {
      fontWeight: '400'
    }
  }}/>
)