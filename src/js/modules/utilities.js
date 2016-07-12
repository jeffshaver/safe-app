import changeCase from 'change-case'

/* global document */

export const checkFetchStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  
  return response.text().then((error) => {
    const err = new Error(error)

    err.response = response

    throw err
  })
}

export const excludeEmptyFilters = (filters) => (
  filters.filter((filter) => {
    const keys = Object.keys(filter)

    return keys.filter((key) => {
      const value = filter[key]

      return String(value).length > 0
    }).length === keys.length
  })
)

export const saveCanvas = (canvas, name) => {
  const image = canvas.toDataURL()
  const aLink = document.createElement('a')
  const evt = document.createEvent('HTMLEvents')

  evt.initEvent('click')
  aLink.download = `${changeCase.pascalCase(name)}.png`
  aLink.href = image
  aLink.dispatchEvent(evt)
}

export const defaultFetchOptions = {
  credentials: 'include'
}

export const getValueByPath = (object, path) => {
  const paths = path.split('.')
  let currentValue = object

  if (paths.length === 1 && paths[0] === '') {
    return null
  }

  paths.forEach((path) => {
    if (!currentValue || !currentValue[path]) {
      currentValue = undefined

      return
    }

    currentValue = currentValue[path]
  })

  return currentValue
}