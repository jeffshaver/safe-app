import React, {Component, PropTypes} from 'react'
import {SelectField, TextField} from 'material-ui'
import MenuItem from 'material-ui/lib/menus/menu-item'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'
import {connect} from 'react-redux'
import {addFilter, editFilter, fetchSourceFields, fetchSources, setSource} from '../actions'

const style = {
  verticalTop: {
    verticalAlign: 'top'
  }
}

class Analytics extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    filters: PropTypes.array.isRequired,
    source: PropTypes.string.isRequired,
    sources: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    const {dispatch} = props

    dispatch(fetchSources())
  }

  handleChangeSource (ev, index, source) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(setSource(source))
    dispatch(fetchSourceFields(source))
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

  handleSetFilterField (index, field) {
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
      fields,
      filters,
      source,
      sources
    } = this.props

    return (
      <div>
        <h2>Analytics</h2>
        <h3>Select a data source</h3>
        <SelectField
          floatingLabelText='Select a data source'
          hintText='Select a data source'
          value={source}
          onChange={::this.handleChangeSource}
        >
          {sources.data.map((source) => (
            <MenuItem
              key={source}
              primaryText={source}
              value={source}
            />
          ))}
        </SelectField>
        <h3>Select filter criteria (optional)</h3>
        {
          filters.map((filter, i) => (
            <div key={i}>
              <SelectField
                floatingLabelText='Select a field'
                hintText='Select a field'
                style={style.verticalTop}
                value={filter.field}
                onChange={(ev, index, value) => this.handleSetFilterField(i, value)}
              >
                {
                  fields.data.map((field) => (
                    <MenuItem
                      key={field}
                      primaryText={field}
                      value={field}
                    />
                  ))
                }
              </SelectField>
              <SelectField
                floatingLabelText='Select an operator'
                hintText='Select an operator'
                style={style.verticalTop}
                value={filter.operator}
                onChange={(ev, index, value) => this.handleSetFilterOperator(i, value)}
              >
                <MenuItem
                  primaryText='='
                  value={'='}
                />
                <MenuItem
                  primaryText='>'
                  value={'>'}
                />
                <MenuItem
                  primaryText='>='
                  value={'>='}
                />
                <MenuItem
                  primaryText='<'
                  value={'<'}
                />
                <MenuItem
                  primaryText='<='
                  value={'<='}
                />
              </SelectField>
              <TextField
                floatingLabelText='Filter Criteria'
                hintText='Filter Criteria'
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
  source: state.source,
  sources: state.sources,
  fields: state.fields,
  filters: state.filters
}))(Analytics)