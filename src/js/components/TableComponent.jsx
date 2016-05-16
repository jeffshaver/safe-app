import {DataTable} from 'safe-framework'
import titleCase from 'title-case'
import React, {Component, PropTypes} from 'react'

export default class TableComponent extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
  }

  render () {
    const {data} = this.props
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
}