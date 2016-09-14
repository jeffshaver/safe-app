import AutoComplete from 'material-ui/AutoComplete/AutoComplete'
import CardExpandable from 'material-ui/Card/CardExpandable'
import {connect} from 'react-redux'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import isEqual from 'lodash.isequal'
import MetricsWrapper from './MetricsWrapper'
import {operators} from '../constants'
import RaisedButton from 'material-ui/RaisedButton'
import {SelectField} from 'safe-framework'
import TextField from 'material-ui/TextField'
import Tooltip from './Tooltip'
import {verticalTop} from '../styles/common'
import {addFilter, editFilter, removeFilter} from '../modules/filters'
import {createFilter, excludeEmptyFilters} from '../modules/utilities'
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
    criteriaDataProperty: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    filters: PropTypes.array.isRequired,
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

    this.handleClickFilter = ::this.handleClickFilter
    this.handleClickReset = ::this.handleClickReset
    this.onAddFilter = ::this.onAddFilter
    this.onChangeField = ::this.onChangeField
    this.onChangeOperator = ::this.onChangeOperator
    this.toggle = ::this.toggle
  }

  createFilterElement = (filter, i, isFirstAndOnlyOptionalFilter, isLastOptionalFilter) => {
    const {
      criteriaDataProperty,
      fields,
      style: filterStyle
    } = this.props
    const field = fields.data.find((field) => field.name === filter.field) || {}
    const {[criteriaDataProperty]: criteriaData} = field
    const ValueField = criteriaData ? AutoComplete : TextField
    const filterIndex = this.getFilterIndex(filter)
    const errorText = filter.required && !filter.value
      ? 'Required'
      : undefined

    return (
      <div key={filterIndex}>
        <SelectField
          disabled={filter.required}
          floatingLabelText='Select a field'
          hintText='Select a field'
          isFetching={fields.isFetching}
          items={fields.data}
          keyProp={'name'}
          primaryTextProp={'name'}
          style={verticalTop}
          value={filter.field}
          valueProp={'name'}
          onChange={(ev, index, value) => this.onChangeField(ev, filterIndex, value, index)}
        />
        <SelectField
          floatingLabelText='Select an operator'
          hintText='Select an operator'
          items={operators}
          keyProp={'value'}
          primaryTextProp={'primaryText'}
          style={verticalTop}
          value={filter.operator}
          valueProp={'value'}
          onChange={(ev, index, value) => this.onChangeOperator(ev, filterIndex, value, index)}
        />
        <ValueField
          dataSource={criteriaData}
          errorText={errorText}
          filter={AutoComplete.caseInsensitiveFilter}
          floatingLabelText='Filter Criteria'
          hintText='Filter Criteria'
          openOnFocus={true}
          searchText={filter.value}
          style={filterStyle}
          value={filter.value}
          onChange={({target: {value}}) => this.onChangeValue(value, filterIndex)}
          onNewRequest={(value) => this.onChangeValue(value, filterIndex)}
          onUpdateInput={(value) => this.onChangeValue(value, filterIndex)}
        />
        {(() => {
          if (filter.required) {
            return null
          }

          return (
            <span>
              {
                isFirstAndOnlyOptionalFilter
                  ? null
                  : this.renderRemoveButton(filterIndex)
              }
              {
                isLastOptionalFilter
                  ? this.renderAddButton()
                  : null
              }
            </span>
          )
        })()}
      </div>
    )
  }

  onAddFilter (ev) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(addFilter(createFilter()))
  }

  onChangeField (ev, index, field) {
    const {dispatch} = this.props

    dispatch(editFilter(index, {
      field
    }))
  }

  onChangeOperator (ev, index, operator) {
    const {dispatch} = this.props

    dispatch(editFilter(index, {operator}))
  }

  onChangeValue (newValue, index) {
    const {dispatch, fields, filters} = this.props
    const filter = filters[index]
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

    dispatch(editFilter(index, {value}))
  }

  onRemoveFilter (ev, index) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(removeFilter(index))
  }

  toggle () {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  getFilterIndex (filter) {
    const {filters} = this.props

    return filters.findIndex((currentFilter) => {
      return isEqual(currentFilter, filter)
    })
  }

  handleClickFilter (...params) {
    const {onClickSubmit} = this.props

    onClickSubmit(...params)
  }

  handleClickReset (...params) {
    const {onClickReset} = this.props

    onClickReset(...params)
  }

  renderAddButton () {
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

  renderButtons () {
    const {expanded} = this.state
    const {
      filters,
      label,
      onClickSubmit,
      style: filterStyle
    } = this.props
    const searchFilters = excludeEmptyFilters(filters)

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

  renderFilters () {
    const {expanded} = this.state
    const {filters} = this.props
    const required = filters.filter((filter) => filter.required)
    const optional = filters.filter((filter) => !filter.required)

    if (!expanded) return null

    return required.concat(optional).map((filter, i, array) => {
      const isFirstAndOnlyOptionalFilter = (
        optional.length === 1 && (
          (i === 0 && required.length === 0) ||
          ((i !== 0 && required.length !== 0) &&
          (i === Math.abs(array.length - required.length - (optional.length - 1))))
        )
      )
      const isLastOptionalFilter = i === array.length - 1

      return this.createFilterElement(
        filter,
        i,
        isFirstAndOnlyOptionalFilter,
        isLastOptionalFilter
      )
    })
  }

  // (i) is the index of the filter in filters
  renderRemoveButton (i) {
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
          onTouchTap={(ev) => this.onRemoveFilter(ev, i)}
        >
          <ContentRemove />
        </FloatingActionButton>
      </Tooltip>
    )
  }

  render () {
    const {
      fields,
      headerStyle,
      headerText,
      onClickSubmit,
      wrapperStyle
    } = this.props

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