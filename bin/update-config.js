const fs = require('fs')
const jsesc = require('jsesc')
const defaultConfig = JSON.parse(fs.readFileSync('default-config.json', 'utf8'))
let existingConfig

// Figure out if an existing config exists

try {
  existingConfig = require('../config')
} catch (e) {
  existingConfig = {}
}

const getValue = (value) => {
  let newValue = JSON.stringify(value)

  if (typeof newValue === 'string') {
    newValue = jsesc(newValue)
  }

  return newValue
}

const fullConfig = Object.assign({}, defaultConfig, existingConfig)
const keys = Object.keys(fullConfig)
const newConfig = 'module.exports = {' + keys.map((key, index) => (
  (index !== 0 ? ',' : '') + `\n  ${key}: ${getValue(fullConfig[key])}`
)).join('').replace(/"/g, '\'') + '\n}'

fs.writeFileSync('config.js', newConfig)