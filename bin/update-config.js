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

const newConfig = 'module.exports = ' + JSON.stringify(fullConfig, null, 2)

fs.writeFileSync('config.js', newConfig)