const fs = require('fs')
const jsesc = require('jsesc')
const is = require('is')
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

  if (is.string(newValue)) {
    newValue = jsesc(newValue)
  }

  return newValue
}

const fullConfig = Object.assign({}, defaultConfig, existingConfig)
const generateArray = (array, level = 1) => {
  if (array.length === 0) return '[]'

  return `[\n${array.map((item, index) => {
    return `${index !== 0 ? ',\n' : ''}${'  '.repeat(level)}${getValue(item)}`
  }).join('')}\n${'  '.repeat(level - 1)}]`
}
const generateObject = (config, level = 1) => {
  const keys = Object.keys(config)

  return '{' +
    keys.map((key, index) => {
      if (is.object(config[key])) {
        return `\n${'  '.repeat(level)}${key}: ${generateObject(config[key], level + 1)}`
      }

      if (is.array(config[key])) {
        return `\n${'  '.repeat(level)}${key}: ${generateArray(config[key], level + 1)}`
      }

      return `\n${'  '.repeat(level)}${key}: ${getValue(config[key])}`
    }) +
    `\n${'  '.repeat(level - 1)}}`
}

const newConfig = 'module.exports = ' + generateObject(fullConfig).replace(/"/g, '\'')

fs.writeFileSync('config.js', newConfig)