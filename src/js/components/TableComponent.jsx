import {DataTable} from 'safe-framework'
import titleCase from 'title-case'
import React, {PropTypes} from 'react'

export const TableComponent = ({data, type}) => {
  const [firstItem = {}] = data
  const columns = Object.keys(firstItem)
    .filter((field) => !field.startsWith('_'))
    .map((field) => ({
      headerName: titleCase(field),
      field
    }))

  return (
    <DataTable
      columns={columns}
      data={data}
      enableColResize='true'
      enableSorting='true'
    />
  )
}

TableComponent.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
}