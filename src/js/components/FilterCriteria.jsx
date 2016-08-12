import AutoComplete from 'material-ui/AutoComplete/AutoComplete'
import CardExpandable from 'material-ui/Card/CardExpandable'
import {connect} from 'react-redux'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import {excludeEmptyFilters} from '../modules/utilities'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import MetricsWrapper from './MetricsWrapper'
import {operators} from '../constants'
import RaisedButton from 'material-ui/RaisedButton'
import {SelectField} from 'safe-framework'
import TextField from 'material-ui/TextField'
import {verticalTop} from '../styles/common'
import {addFilter, editFilter, removeFilter} from '../modules/filters'
import React, {Component, PropTypes} from 'react'

const styles = {
  expandButton: {
    position: 'relative',
    verticalAlign: 'middle'
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
    wrapperStyle: PropTypes.object,
    onClickFilter: PropTypes.func,
    onClickReset: PropTypes.func
  }

  static defaultProps = {
    criteriaDataProperty: 'data',
    headerStyle: {},
    headerText: 'Select filter criteria (optional)',
    onClickFilter: null,
    style: {},
    wrapperStyle: {}
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

  onAddFilter (ev) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(addFilter({
      field: '',
      operator: '',
      value: ''
    }))
  }

  onChangeField (ev, index, field, fieldIndex) {
    const {dispatch} = this.props

    dispatch(editFilter(index, {
      field,
      fieldIndex
    }))
  }

  onChangeOperator (ev, index, operator) {
    const {dispatch} = this.props

    dispatch(editFilter(index, {operator}))
  }

  onChangeValue (ev, index) {
    const {dispatch, fields, filters} = this.props
    const filter = filters[index]
    let value = ev.target.value
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
    const newValueIsEmpty = ev.target.value.length === 0

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

  handleClickFilter (...params) {
    const {onClickFilter} = this.props

    if (this.state.expanded) {
      this.toggle()
    }

    onClickFilter(...params)
  }

  handleClickReset (...params) {
    const {onClickReset} = this.props

    onClickReset(...params)
  }
  
  renderAddButton (i) {
    const {filters, style} = this.props

    if (i !== filters.length - 1) return null

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
  
  renderButtons () {
    const {expanded} = this.state
    const {
      filters,
      label,
      onClickFilter,
      style
    } = this.props
    const searchFilters = excludeEmptyFilters(filters)
    
    if (!expanded || !onClickFilter) return null
    
    return (
      <span>
        <MetricsWrapper
          component={
            <RaisedButton
              label='Filter'
              primary={true}
              style={style.button}
            />}
          data={{filters: searchFilters}}
          label={label + '_Filter'}
          onTouchTap={this.handleClickFilter}
        />
        <RaisedButton
          label='Reset'
          style={style.button}
          onTouchTap={this.handleClickReset}
        />
      </span>
    )
  }

  renderFilters () {
    const {expanded} = this.state

    if (!expanded) return null

    const {filters} = this.props

    return filters.map((filter, i) => {
      const {
        criteriaDataProperty,
        fields,
        style
      } = this.props
      const field = fields.data[filter.fieldIndex] || {}
      const {[criteriaDataProperty]: criteriaData} = field
      const ValueField = criteriaData ? AutoComplete : TextField

      return (
        <div key={i}>
          <SelectField
            floatingLabelText='Select a field'
            hintText='Select a field'
            isFetching={fields.isFetching}
            items={fields.data}
            keyProp={'name'}
            primaryTextProp={'name'}
            style={verticalTop}
            value={filter.field}
            valueProp={'name'}
            onChange={(ev, index, value) => this.onChangeField(ev, i, value, index)}
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
            onChange={(ev, index, value) => this.onChangeOperator(ev, i, value, index)}
          />
          <ValueField
            dataSource={criteriaData}
            filter={AutoComplete.caseInsensitiveFilter}
            floatingLabelText='Filter Criteria'
            hintText='Filter Criteria'
            openOnFocus={true}
            style={style}
            value={filter.value}
            onChange={(ev) => this.onChangeValue(ev, i)}
          />
          {this.renderRemoveButton(i)}
          {this.renderAddButton(i)}
        </div>
      )
    })
  }

  renderRemoveButton (i) {
    const {filters, style} = this.props

    if (filters.length === 1) return null

    return (
      <FloatingActionButton
        mini={true}
        primary={true}
        style={{
          ...style,
          margin: '1em 0 0 1em'
        }}
        onTouchTap={(ev) => this.onRemoveFilter(ev, i)}
      >
        <ContentRemove />
      </FloatingActionButton>
    )
  }

  render () {
    const {
      fields,
      headerStyle,
      headerText,
      onClickFilter,
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
          {onClickFilter
            ? <CardExpandable
              expanded={this.state.expanded}
              style={styles.expandButton}
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