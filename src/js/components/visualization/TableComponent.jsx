import changeCase from 'change-case'
import {DataTable} from 'safe-framework'
import React, {Component, PropTypes} from 'react'

const style = {
  container: {
    height: 'auto'
  }
}

export class TableComponent extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    metadata: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired
  }

  render () {
    const {data, metadata, name} = this.props
    const {visualizationParams: params = {}} = metadata
    const {drillDownFieldName} = params

    return (
      <DataTable
        childProp={drillDownFieldName}
        containerStyle={style.container}
        data={data}
        enableColResize='true'
        enableSorting='true'
        exportFileName={`${changeCase.pascalCase(name)}.csv`}
        ref={(ref) => (this._component = ref)}
      />
    )
  }
}