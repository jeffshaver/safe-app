import changeCase from 'change-case'
import Download from 'material-ui/svg-icons/file/file-download'
import MenuItem from 'material-ui/MenuItem'
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

  aLink.download = `${changeCase.pascalCase(name)}.png`
  aLink.href = image
  aLink.click()
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
  Summary: [],
  Table: [{
    key: 'exportTable',
    leftIcon: <Download />,
    primaryText: 'Export',
    onTouchTap: exportTableToCSV
  }]
}

export const generateMenuItems = (type, params) => {
  return (menuItemDefs[type] || [])
    .map(({key, leftIcon, primaryText, onTouchTap}, i) => {
      const onTouchTapWrapper = () => {
        onTouchTap(...params)
      }

      return (
        <MenuItem
          key={key}
          leftIcon={leftIcon}
          primaryText={primaryText}
          style={{cursor: 'default'}}
          onTouchTap={onTouchTapWrapper}
        />
      )
    })
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