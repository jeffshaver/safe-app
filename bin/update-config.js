const fs = require('fs')
const defaultConfig = JSON.parse(fs.readFileSync('default-config.json', 'utf8'))
let existingConfig

// Figure out if an existing config exists

try {
  existingConfig = require('../config')
} catch (e) {
  existingConfig = {}
}

const fullConfig = Object.assign({}, defaultConfig, existingConfig)
const keys = Object.keys(fullConfig)
const newConfig = 'module.exports = {' + keys.map((key, index) => (
  (index !== 0 ? ',' : '') + `\n  ${key}: ${JSON.stringify(fullConfig[key])}`
)).join('').replace(/"/g, '\'') + '\n}'

fs.writeFileSync('config.js', newConfig)