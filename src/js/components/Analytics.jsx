import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import AnalyticSelect from './AnalyticSelect'
import FilterCriteria from './FilterCriteria'
import SourceSelect from './SourceSelect'
import VisualizationSelect from './VisualizationSelect'
import {
  addFilter,
  editFilter,
  fetchAnalytics,
  fetchSourceFields,
  fetchSources,
  fetchVisualizations,
  setAnalytic,
  setSource,
  setVisualization
} from '../actions'

const style = {
  verticalTop: {
    verticalAlign: 'top'
  }
}

class Analytics extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    const {dispatch} = props

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
    dispatch(fetchVisualizations(analytic))
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
    dispatch(fetchSourceFields(source))
    dispatch(fetchAnalytics(source))
  }

  onChangeValue (index, value) {
    const {dispatch} = this.props

    dispatch(editFilter(index, {value}))
  }

  onChangeVisualization (ev, index, visualization) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(setVisualization(visualization))
  }

  render () {
    return (
      <div>
        <h2>Analytics</h2>
        <SourceSelect
          onChange={::this.onChangeSource}
        />
        <FilterCriteria
          style={style}
          onAdd={::this.onAddFilter}
          onChangeField={::this.onChangeField}
          onChangeOperator={::this.onChangeOperator}
          onChangeValue={::this.onChangeValue}
        />
        <AnalyticSelect
          onChange={::this.onChangeAnalytic}
        />
        <VisualizationSelect
          onChange={::this.onChangeVisualization}
        />
      </div>
    )
  }
}

export default connect()(Analytics)