import React, {Component, PropTypes} from 'react'
import {Card, CardTitle, Paper, SelectField, TextField} from 'material-ui'
import MenuItem from 'material-ui/lib/menus/menu-item'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'
import {connect} from 'react-redux'
import {addFilter, editFilter, setDataSource} from '../actions'

const style = {
  verticalTop: {
    verticalAlign: 'top'
  }
}

class Analytics extends Component {
  handleChangeDataSource (ev, index, value) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(setDataSource(value))
  }

  handleAddFilter (ev) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(addFilter({
      field: '',
      operator: '',
      value: ''
    }))
  }

  handleSetFilterField (ev, index, field) {
    const {dispatch} = this.props

    dispatch(editFilter(index, {field}))
  }

  handleSetFilterOperator (index, operator) {
    const {dispatch} = this.props

    dispatch(editFilter(index, {operator}))
  }

  handleSetFilterValue (index, value) {
    const {dispatch} = this.props

    dispatch(editFilter(index, {value}))
  }

  render () {
    const {
      dataSource,
      dataSources,
      filters
    } = this.props

    return (
      <div>
        <h2>Analytics</h2>
        <h3>Select a data source</h3>
        <SelectField
          floatingLabelText="Select a data source"
          hintText="Select a data source"
          value={dataSource}
          onChange={::this.handleChangeDataSource}
        >
          {dataSources.map((dataSource) => (
            <MenuItem
              key={dataSource}
              primaryText={dataSource}
              value={dataSource}
            />
          ))}
        </SelectField>
        <h3>Select filter criteria (optional)</h3>
        {
          filters.map((filter, i) => (
            <div>
              <SelectField
                floatingLabelText="Select a field"
                hintText="Select a field"
                style={style.verticalTop}
                value={filter.field}
              >
              </SelectField>
              <SelectField
                floatingLabelText="Select an operator"
                hintText="Select an operator"
                style={style.verticalTop}
                value={filter.operator}
                onChange={(ev, index, value) => this.handleSetFilterOperator(i, value)}
              >
                <MenuItem value={'='} primaryText='=' />
                <MenuItem value={'>'} primaryText='>' />
                <MenuItem value={'>='} primaryText='>=' />
                <MenuItem value={'<'} primaryText='<' />
                <MenuItem value={'<='} primaryText='<=' />
              </SelectField>
              <TextField
                floatingLabelText="Filter Criteria"
                hintText="Filter Criteria"
                style={style.verticalTop}
                value={filter.value}
                onChange={(ev) => this.handleSetFilterValue(i, ev.target.value)}
              />
              {(() => {
                if (i === filters.length - 1) {
                  return (
                    <FloatingActionButton
                      mini={true}
                      secondary={true}
                      onTouchTap={::this.handleAddFilter}
                    >
                      <ContentAdd />
                    </FloatingActionButton>
                  )
                }
              })()}
            </div>
          ))
        }
        <h3>Select an analytic</h3>
        <h3>Select a visualization</h3>
      </div>
    )
  }
}

export default connect((state) => ({
  dataSource: state.dataSource,
  dataSources: state.dataSources,
  filters: state.filters
}))(Analytics)