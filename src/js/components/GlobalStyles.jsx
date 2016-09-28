import React from 'react'
import {Style} from 'radium'
import {white} from 'material-ui/styles/colors'

export const GlobalStyles = () => (
  <Style rules={{
    body: {
      fontFamily: 'Roboto, sans-serif'
    },
    'body *': {
      fontFamily: 'inherit'
    },
    'footer a': {
      color: white
    },
    'h1, h2, h3, h4': {
      fontWeight: '400'
    },
    '.ag-material': {
      flex: 1
    },
    '.ag-material #borderLayout_eRootPanel': {
      height: 'calc(100% - 152px) !important'
    }
  }} />
)