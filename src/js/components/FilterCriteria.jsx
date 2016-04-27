import {connect} from 'react-redux'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'
import ContentRemove from 'material-ui/lib/svg-icons/content/remove'
import {addFilter, editFilter, removeFilter} from '../modules/filters'
import {FloatingActionButton, MenuItem, SelectField, TextField} from 'material-ui'
import React, {Component, PropTypes} from 'react'

class FilterCriteria extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    filters: PropTypes.array.isRequired,
    style: PropTypes.object,
    wrapperStyle: PropTypes.object
  }

  static defaultProps = {
    style: {},
    wrapperStyle: {}
  }

  constructor (props) {
    super(props)

    this.onAddFilter = ::this.onAddFilter
  }

  onAddFilter (ev) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(addFilter({
      field: '',
      operator: '',
      value: ''
    }))
  }

  onChangeField (ev, index, field) {
    const {dispatch} = this.props

    dispatch(editFilter(index, {field}))
  }

  onChangeOperator (ev, index, operator) {
    const {dispatch} = this.props

    dispatch(editFilter(index, {operator}))
  }

  onChangeValue (ev, index) {
    const {dispatch, fields, filters} = this.props
    const filter = filters[index]
    let value = ev.target.value

    fields.data.forEach((item) => {
      const isCurrentField = filter.field === item.name
      const fieldIsString = item.dataType === 'String'
      const shouldConvert = isCurrentField && !fieldIsString

      if (!shouldConvert) {
        return
      }

      value = JSON.parse(value)
    })

    dispatch(editFilter(index, {value}))
  }

  onRemoveFilter (ev, index) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(removeFilter(index))
  }

  render () {
    const {
      fields,
      filters,
      style,
      wrapperStyle
    } = this.props

    return (
      <div style={wrapperStyle}>
        <h3>Select filter criteria (optional)</h3>
        {
          filters.map((filter, i) => (
            <div key={i}>
              <SelectField
                floatingLabelText='Select a field'
                hintText='Select a field'
                style={style}
                value={filter.field}
                onChange={(ev, index, value) => this.onChangeField(ev, i, value)}
              >
                {
                  fields.data.map((field) => (
                    <MenuItem
                      key={field.name}
                      primaryText={field.name}
                      value={field.name}
                    />
                  ))
                }
              </SelectField>
              <SelectField
                floatingLabelText='Select an operator'
                hintText='Select an operator'
                style={style}
                value={filter.operator}
                onChange={(ev, index, value) => this.onChangeOperator(ev, i, value)}
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
                style={style}
                value={filter.value}
                onChange={(ev) => this.onChangeValue(ev, i)}
              />
              {(() => {
                if (filters.length !== 1) {
                  return (
                    <FloatingActionButton
                      mini={true}
                      primary={true}
                      style={{
                        ...style,
                        margin: '1em 0 0 1em'
                      }}
                      onTouchTap={(ev) => this.onRemove(ev, i)}
                    >
                      <ContentRemove />
                    </FloatingActionButton>
                  )
                }
              })()}
              {(() => {
                if (i === filters.length - 1) {
                  return (
                    <FloatingActionButton
                      mini={true}
                      secondary={true}
                      style={{
                        ...style,
                        margin: '1em 0 0 1em'
                      }}
                      onTouchTap={this.onAddFilter}
                    >
                      <ContentAdd />
                    </FloatingActionButton>
                  )
                }
              })()}
            </div>
          ))
        }
      </div>
    )
  }
}

export default connect((state) => ({
  fields: state.fields,
  filters: state.filters
}))(FilterCriteria)