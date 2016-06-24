import changeCase from 'change-case'
import {DataTable} from 'safe-framework'
import React, {PropTypes} from 'react'

export const TableComponent = ({data, metadata, name, type}) => {
  const {visualizationParams: params = {}} = metadata
  const {drillDownFieldName} = params
  
  return (
    <DataTable
      childProp={drillDownFieldName}
      data={data}
      enableColResize='true'
      enableSorting='true'
      exportFileName={`${changeCase.pascalCase(name)}.csv`}
    />
  )
}

TableComponent.propTypes = {
  data: PropTypes.array.isRequired,
  metadata: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}