import AutoComplete from 'material-ui/AutoComplete/AutoComplete'
import CardExpandable from 'material-ui/Card/CardExpandable'
import {connect} from 'react-redux'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import MetricsWrapper from './MetricsWrapper'
import {operators} from '../constants'
import RaisedButton from 'material-ui/RaisedButton'
import {SelectField} from 'safe-framework'
import TextField from 'material-ui/TextField'
import Tooltip from './Tooltip'
import {verticalTop} from '../styles/common'
import {addFilter, editFilter, removeFilter} from '../modules/filters'
import {createFilter, excludeEmptyFilters, filtersToArray} from '../modules/utilities'
import {cyan500, grey400, redA400} from 'material-ui/styles/colors.js'
import React, {Component, PropTypes} from 'react'

const style = {
  directions: {
    margin: 0
  },
  expandButton: {
    position: 'relative',
    verticalAlign: 'middle'
  },
  filterButton: {
    margin: '1em 0 0 1em'
  },
  resetButton: {
    margin: '0 0 0 1em'
  },
  colors: {
    blue: {
      color: cyan500,
      fontWeight: 'bold'
    },
    grey: {
      color: grey400,
      fontSize: 14
    },
    red: {
      color: redA400
    }
  }
}

class FilterCriteria extends Component {
  static propTypes = {
    containerId: PropTypes.string.isRequired,
    criteriaDataProperty: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    headerStyle: PropTypes.object,
    headerText: PropTypes.string,
    label: PropTypes.string,
    style: PropTypes.object,
    valid: PropTypes.bool,
    wrapperStyle: PropTypes.object,
    onClickReset: PropTypes.func,
    onClickSubmit: PropTypes.func
  }

  static defaultProps = {
    criteriaDataProperty: 'data',
    headerStyle: {},
    headerText: 'Select filter criteria',
    style: {},
    valid: true,
    wrapperStyle: {},
    onClickReset: () => {},
    onClickSubmit: () => {}
  }

  constructor (props) {
    super(props)

    this.state = {
      expanded: true
    }

    // this.handleClickFilter = ::this.handleClickFilter
    // this.handleClickReset = ::this.handleClickReset
  }

  onAddFilter = () => {
    const {containerId, dispatch} = this.props
    const filter = createFilter()

    dispatch(addFilter(containerId, filter))
  }

  onRemoveFilter = (id) => {
    const {containerId, dispatch} = this.props

    dispatch(removeFilter(containerId, id))
  }

  onChangeField = (id, field) => {
    const {containerId, dispatch} = this.props

    dispatch(editFilter(containerId, id, {field}))
  }

  onChangeOperator = (id, operator) => {
    const {containerId, dispatch} = this.props

    dispatch(editFilter(containerId, id, {operator}))
  }

  onChangeValue = (id, newValue) => {
    const {containerId, dispatch, fields, filters} = this.props
    const filter = filters[containerId][id]
    let value = newValue
    let valueDataTypeMismatch = false

    fields.data.forEach((item) => {
      const isCurrentField = filter.field === item.name
      const shouldConvert = isCurrentField && !['String', 'IPv4'].includes(item.dataType)

      if (!shouldConvert) {
        return
      }

      try {
        value = JSON.parse(value)
      } catch (e) {
        valueDataTypeMismatch = true
        value = ''
      }
    })

    const currentValueIsEmpty = filter.value.toString().length === 0
    const newValueIsEmpty = newValue.length === 0

    if (valueDataTypeMismatch && !currentValueIsEmpty && !newValueIsEmpty) {
      return
    }

    dispatch(editFilter(containerId, id, {value}))
  }

  handleClickFilter = (...params) => {
    const {onClickSubmit} = this.props

    onClickSubmit(...params)
  }

  handleClickReset = (...params) => {
    const {onClickReset} = this.props

    onClickReset(...params)
  }

  createFilterElement = (
    id,
    {field: fieldName, operator, required, value},
    isLastFilter
  ) => {
    const {criteriaDataProperty, fields, style: filterStyle} = this.props
    const field = fields.data.find((field) => field.name === fieldName) || {}
    const {[criteriaDataProperty]: fieldData} = field
    const ValueField = fieldData ? AutoComplete : TextField
    const errorText = required && !value
      ? 'Required'
      : undefined

    return (
      <div key={id}>
        <SelectField
          disabled={required}
          floatingLabelText='Select a field'
          hintText='Select a field'
          isFetching={fields.isFetching}
          items={fields.data}
          keyProp={'name'}
          primaryTextProp={'name'}
          style={verticalTop}
          value={fieldName}
          valueProp={'name'}
          onChange={(ev, index, value) => this.onChangeField(id, value)}
        />
        <SelectField
          floatingLabelText='Select an operator'
          hintText='Select an operator'
          items={operators}
          keyProp={'value'}
          primaryTextProp={'primaryText'}
          style={verticalTop}
          value={operator}
          valueProp={'value'}
          onChange={(ev, index, value) => this.onChangeOperator(id, value)}
        />
        <ValueField
          dataSource={fieldData}
          errorText={errorText}
          filter={AutoComplete.caseInsensitiveFilter}
          floatingLabelText='Filter Criteria'
          hintText='Filter Criteria'
          openOnFocus={true}
          searchText={value}
          style={filterStyle}
          value={value}
          onChange={({target: {value}}) => this.onChangeValue(id, value)}
          onNewRequest={(value) => this.onChangeValue(id, value)}
          onUpdateInput={(value) => this.onChangeValue(id, value)}
        />
        {(() => {
          if (required && !isLastFilter) return null

          if (required && isLastFilter) {
            return (
              <span>
                {
                  isLastFilter
                    ? this.renderAddButton()
                    : null
                }
              </span>
            )
          }

          return (
            <span>
              {this.renderRemoveButton(id)}
              {
                isLastFilter
                  ? this.renderAddButton()
                  : null
              }
            </span>
          )
        })()}
      </div>
    )
  }

  toggle = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  renderAddButton = () => {
    const {style: filterStyle} = this.props

    return (
      <Tooltip
        label='Click to add a new filter'
        style={{
          ...style.filterButton
        }}
      >
        <FloatingActionButton
          mini={true}
          secondary={true}
          style={{
            ...filterStyle,
            ...style.filterButton
          }}
          onTouchTap={this.onAddFilter}
        >
          <ContentAdd />
        </FloatingActionButton>
      </Tooltip>
    )
  }

  renderRemoveButton (containerId, id) {
    const {style: filterStyle} = this.props

    return (
      <Tooltip
        label='Click to remove this filter'
        style={{
          ...style.filterButton
        }}
      >
        <FloatingActionButton
          mini={true}
          primary={true}
          style={{
            ...filterStyle,
            ...style.filterButton
          }}
          onTouchTap={(ev) => this.onRemoveFilter(containerId, id)}
        >
          <ContentRemove />
        </FloatingActionButton>
      </Tooltip>
    )
  }

  renderButtons = () => {
    const {expanded} = this.state
    const {
      containerId,
      filters,
      label,
      onClickSubmit,
      style: filterStyle
    } = this.props
    const searchFilters = excludeEmptyFilters(filtersToArray(filters, containerId))

    if (!expanded || !onClickSubmit) return null

    return (
      <span>
        <MetricsWrapper
          component={
            <RaisedButton
              disabled={!this.props.valid}
              label='Submit'
              primary={true}
              style={filterStyle.button}
            />}
          data={{filters: searchFilters}}
          label={label + '_Submit'}
          onTouchTap={this.handleClickFilter}
        />
        <RaisedButton
          label='Reset'
          style={{
            ...filterStyle.button,
            ...style.resetButton
          }}
          onTouchTap={this.handleClickReset}
        />
      </span>
    )
  }

  renderFilters = () => {
    const {containerId, filters: allFilters} = this.props
    const filters = allFilters[containerId]
    const {expanded} = this.state

    if (!expanded) return null

    const filterIds = Object.keys(filters)

    return filterIds.map((id, i) => {
      const filter = filters[id]

      return this.createFilterElement(id, filter, i === filterIds.length - 1)
    })
  }

  render = () => {
    const {fields, headerStyle, headerText, wrapperStyle, onClickSubmit} = this.props

    if (fields.data.length === 0) {
      return (
        <div style={wrapperStyle}>
          <h3>No fields found to use for filtering</h3>
        </div>
      )
    }

    return (
      <div style={wrapperStyle}>
        <h3 style={headerStyle}>
          {headerText}
          {onClickSubmit
            ? <CardExpandable
              expanded={this.state.expanded}
              style={style.expandButton}
              onExpanding={this.toggle}
              />
          : null}
        </h3>
        {this.renderFilters()}
        {this.renderButtons()}
      </div>
    )
  }
}

export default connect((state) => ({
  filters: state.filters
}))(FilterCriteria)