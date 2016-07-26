import changeCase from 'change-case'
import Download from 'material-ui/svg-icons/file/file-download'
import React from 'react'

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

export const saveCanvasFromVisualization = (metadata, visualization) => {
  const {_chart} = visualization._component
  const {name} = metadata

  saveCanvas(
    _chart.getChartCanvas(),
    changeCase.pascalCase(name) + '.png'
  )
}

export const saveCanvas = (canvas, name) => {
  const image = canvas.toDataURL()
  const aLink = document.createElement('a')
  const evt = document.createEvent('HTMLEvents')

  evt.initEvent('click')
  aLink.download = `${changeCase.pascalCase(name)}.png`
  aLink.href = image
  aLink.dispatchEvent(evt)
}

export const exportTableToCSV = (metadata, visualization) => {
  visualization._component._table.exportToCSV()
}

export const menuItemDefs = {
  Chart: [{
    key: 'saveChart',
    leftIcon: <Download />,
    primaryText: 'Save',
    onTouchTap: saveCanvasFromVisualization
  }],
  Map: [],
  Table: [{
    key: 'exportTable',
    leftIcon: <Download />,
    primaryText: 'Export',
    onTouchTap: exportTableToCSV
  }]
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