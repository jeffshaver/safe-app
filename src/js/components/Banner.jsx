import {bannerText} from '../../../config'
import React from 'react'
import {grey800, yellow200} from 'material-ui/styles/colors'

const style = {
  banner: {
    background: grey800,
    color: yellow200,
    fontSize: '0.8rem',
    fontWeight: 400,
    textAlign: 'center'
  }
}

export const Banner = () => (
  bannerText
    ? <div style={style.banner}>{bannerText}</div>
    : null
)
