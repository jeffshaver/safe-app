import AnalyticSelect from './AnalyticSelect'
import {connect} from 'react-redux'
import {fetchAnalytics} from '../modules/analytics'
import {fetchFields} from '../modules/fields'
import {fetchSources} from '../modules/sources'
import {fetchVisualizationTypes} from '../modules/visualization-types'
import FilterCriteria from './FilterCriteria'
import {Hydrateable} from '../decorators'
import {setAnalytic} from '../modules/analytic'
import {setSource} from '../modules/source'
import {setVisualization} from '../modules/visualization'
import SourceSelect from './SourceSelect'
import VisualizationSelect from './VisualizationSelect'
import {addFilter, editFilter, removeFilter} from '../modules/filters'
import {header, main} from '../styles/common'
import React, {Component, PropTypes} from 'react'

const style = {
  hidden: {
    display: 'none'
  },
  verticalTop: {
    verticalAlign: 'top'
  }
}

@Hydrateable('Analytics', ['analytic', 'filters', 'source', 'visualization'])
class Analytics extends Component {
  static propTypes = {
    analytic: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,
    source: PropTypes.string.isRequired,
    visualization: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    this.displayName = 'Analytics'

    this.onAddFilter = ::this.onAddFilter
    this.onChangeAnalytic = ::this.onChangeAnalytic
    this.onChangeField = ::this.onChangeField
    this.onChangeOperator = ::this.onChangeOperator
    this.onChangeSource = ::this.onChangeSource
    this.onChangeValue = ::this.onChangeValue
    this.onChangeVisualization = ::this.onChangeVisualization
    this.onRemoveFilter = ::this.onRemoveFilter
  }

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(fetchSources())
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

  onChangeAnalytic (ev, index, analytic) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(setAnalytic(analytic))
    dispatch(fetchVisualizationTypes(analytic))
  }

  onChangeField (index, field) {
    const {dispatch} = this.props

    dispatch(editFilter(index, {field}))
  }

  onChangeOperator (index, operator) {
    const {dispatch} = this.props

    dispatch(editFilter(index, {operator}))
  }

  onChangeSource (ev, index, source) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(setSource(source))
    dispatch(fetchFields(source))
    dispatch(fetchAnalytics(source))
  }

  onChangeValue (index, value, field, fields) {
    const {dispatch} = this.props
    
    fields.forEach((item) => {
      const isCurrentField = field === item.name
      const fieldIsString = item.datatype === 'String'
      const shouldConvert = isCurrentField && !fieldIsString
  
      if (!shouldConvert) {
        return
      }

      value = JSON.parse(value)
    })

    dispatch(editFilter(index, {value}))
  }

  onChangeVisualization (ev, index, visualization) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(setVisualization(visualization))
  }

  onRemoveFilter (ev, index) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(removeFilter(index))
  }

  render () {
    const {source, analytic} = this.props
    const analyticStyle = source === ''
      ? style.hidden
      : {}
    const filterStyle = source === ''
      ? style.hidden
      : {}
    const visualizationStyle = source === '' || analytic === ''
      ? style.hidden
      : {}

    return (
      <div>
        <header style={header}>
          <h1>Analytics</h1>
        </header>
        <main style={main}>
          <SourceSelect
            style={style.verticalTop}
            onChange={this.onChangeSource}
          />
          <AnalyticSelect
            style={{
              ...style.verticalTop,
              ...analyticStyle
            }}
            onChange={this.onChangeAnalytic}
          />
          <VisualizationSelect
            style={{
              ...style.verticalTop,
              ...visualizationStyle
            }}
            onChange={this.onChangeVisualization}
          />
          <FilterCriteria
            style={{
              ...style.verticalTop
            }}
            wrapperStyle={{
              ...filterStyle
            }}
            onAdd={this.onAddFilter}
            onChangeField={this.onChangeField}
            onChangeOperator={this.onChangeOperator}
            onChangeValue={this.onChangeValue}
            onRemove={this.onRemoveFilter}
          />
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  analytic: state.analytic,
  filters: state.filters,
  source: state.source,
  visualization: state.visualization
}))(Analytics)