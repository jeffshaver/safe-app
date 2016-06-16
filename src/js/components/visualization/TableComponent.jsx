import changeCase from 'change-case'
import {DataTable} from 'safe-framework'
import React, {Component, PropTypes} from 'react'

export class TableComponent extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }

  render () {
    const {data, name} = this.props
    const [firstItem = {}] = data
    const columns = Object.keys(firstItem)
      .filter((field) => !field.startsWith('_'))
      .map((field) => ({
        headerName: changeCase.titleCase(field),
        field
      }))
  
    return (
      <DataTable
        columns={columns}
        data={data}
        enableColResize='true'
        enableSorting='true'
        exportFileName={`${changeCase.pascalCase(name)}.csv`}
        ref={(ref) => (this.table = ref)}
      />
    )
  }
}