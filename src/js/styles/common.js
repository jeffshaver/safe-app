import {bannerText, headerText} from '../../../config'

export const header = {
  backgroundColor: '#00bcd4',
  color: '#fff',
  height: '65px',
  padding: '1.7em 0 0 1.25em'
}

export const main = {
  padding: '0 1.25em'
}

export const verticalTop = {
  verticalAlign: 'top'
}

let logoStyle

if (bannerText && headerText) {
  logoStyle = {padding: '.98em 1.05em'}
} else if (bannerText || headerText) {
  logoStyle = {padding: '.5em 1.05em'}
} else {
  logoStyle = {padding: '.05em 1.05em'}
}

export {logoStyle}