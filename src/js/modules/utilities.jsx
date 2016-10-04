import changeCase from 'change-case'
import Download from 'material-ui/svg-icons/file/file-download'
import MenuItem from 'material-ui/MenuItem'
import React from 'react'
import uuid from 'node-uuid'

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
  const {_component: {_component}} = visualization
  const {name} = metadata

  saveCanvas(
    _component.getChartCanvas(),
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
  visualization._component._component.exportToCSV()
}

export const menuItemDefs = {
  Chart: [{
    key: 'saveChart',
    leftIcon: <Download />,
    primaryText: 'Export',
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

export const getNameByID = (list, id) => {
  if (list.length === 0 || id === '') {
    return ''
  }

  for (const item of list) {
    const {_id, name} = item

    if (_id === id) {
      return name
    }
  }
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

export const createFilter = (filter = {}) => {
  const initialValue = {
    field: '',
    operator: '=',
    required: false,
    value: ''
  }

  return Object.assign({}, initialValue, filter)
}

export const validateFilters = (filters = {}) => {
  const filtersAsArray = Object.keys(filters).map((id) => filters[id])

  return filtersAsArray.filter((filter) => {
    return filter.required && (!filter.operator || !filter.value)
  }).length === 0
}

export const filtersToArray = (filters, containerId) => {
  if (containerId) filters = filters[containerId]

  return Object.keys(filters).map((id) => filters[id])
}

export const filtersArrayToObject = (filtersArray) => {
  let allFilters = {}

  filtersArray.forEach((filter) => {
    allFilters = {
      ...allFilters,
      [uuid.v1()]: {
        ...filter
      }
    }
  })

  return allFilters
}

export const getDefaultFilters = (fields, dashboardFilters) => {
  const requiredFields = getRequiredFields(fields)
  const requiredFilters = getRequiredFilters(requiredFields, dashboardFilters)
  const optionalFilters = getOptionalFilters(requiredFilters, dashboardFilters)

  return filtersArrayToObject(requiredFilters.concat(optionalFilters))
}

export const getRequiredFields = (fields) => (
  fields.filter((field) => field.required)
)

export const getRequiredFilters = (requiredFields, dashboardFilters) => {
  return requiredFields
    .map((field) => {
      let newFilter = createFilter({
        field: field.name,
        required: true
      })
      const existingFilter = dashboardFilters.find((filter) => {
        return filter.field === field.name
      })

      if (existingFilter) {
        newFilter = Object.assign({}, newFilter, existingFilter)
      }

      return newFilter
    })
}

export const getOptionalFilters = (requiredFilters, dashboardFilters) => {
  const optional = dashboardFilters.filter((filter) => {
    return !requiredFilters.find((requiredFilter) => {
      return requiredFilter.field === filter.field
    })
  })

  if (optional.length === 0) {
    optional.push(createFilter())
  }

  return optional
}