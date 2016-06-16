import React from 'react'
import {footerLeftText, footerRightText} from '../../../config'
import {grey800, white} from 'material-ui/styles/colors'

const style = {
  bottomLeft: {
    display: 'inline-block'
  },
  bottomRight: {
    float: 'right'
  },
  footer: {
    background: grey800,
    color: white,
    display: 'flex',
    fontSize: '0.8rem',
    padding: '.2em 1.25em'
  },
  footerParagraph: {
    margin: 0,
    padding: 0
  },
  spacer: {
    flex: 1
  }
}

const formatFooter = (arg) => {
  let texts = [...arg]

  if (typeof texts === 'string' && texts.trim !== '') {
    texts = [texts]
  }

  if (!Array.isArray(texts) || texts.length === 0) {
    return ''
  }

  const jsx = (
    <div>
      {
        texts.map((text, iter) => (
          <p
            dangerouslySetInnerHTML={{__html: text}}
            key={iter}
            style={style.footerParagraph}
          />
        ))
      }
    </div>
  )

  return jsx
}
const footerLeft = footerLeftText
  ? formatFooter(footerLeftText)
  : null
const footerRight = footerRightText
  ? formatFooter(footerRightText)
  : null

export const Footer = () => {
  const footer = footerRight || footerLeft
    ? <footer style={style.footer}>{footerLeft}<div style={style.spacer}></div>{footerRight}</footer>
    : null

  return (
    footer
  )
}