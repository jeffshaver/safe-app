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

let logoStyle = {
  border: 'none',
  borderBottom: '1px solid rgb(224, 224, 224)',
  borderRadius: 0,
  padding: '1.725em 1.05em'
}

if (bannerText && headerText) {
  logoStyle = {...logoStyle, padding: '2.65em 1.05em'}
} else if (bannerText || headerText) {
  logoStyle = {...logoStyle, padding: '2.2em 1.05em'}
}

export {logoStyle}