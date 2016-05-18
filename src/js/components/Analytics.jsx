import {connect} from 'react-redux'
import {fetchAnalytics} from '../modules/analytics'
import {fetchFields} from '../modules/fields'
import {fetchSources} from '../modules/sources'
import {fetchVisualizationTypes} from '../modules/visualization-types'
import FilterCriteria from './FilterCriteria'
import {SelectField} from './SelectField'
import {setAnalytic} from '../modules/analytic'
import {setSource} from '../modules/source'
import {setVisualization} from '../modules/visualization'
import {header, main, verticalTop} from '../styles/common'
import {Hydrateable, LogMetrics} from '../decorators'
import React, {Component, PropTypes} from 'react'

const style = {
  hidden: {
    display: 'none'
  }
}

@LogMetrics('pageView', 'Analytics')
@Hydrateable('Analytics', ['analytic', 'filters', 'source', 'visualization'])
class Analytics extends Component {
  static propTypes = {
    analytic: PropTypes.string.isRequired,
    analytics: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    filters: PropTypes.array.isRequired,
    source: PropTypes.string.isRequired,
    sources: PropTypes.object.isRequired,
    visualization: PropTypes.string.isRequired,
    visualizationTypes: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.displayName = 'Analytics'

    this.onChangeAnalytic = ::this.onChangeAnalytic
    this.onChangeSource = ::this.onChangeSource
    this.onChangeVisualization = ::this.onChangeVisualization
  }

  componentWillMount () {
    const {dispatch} = this.props
    
    dispatch(fetchSources())
  }

  onChangeAnalytic (ev, index, analytic) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(setAnalytic(analytic))
    dispatch(fetchVisualizationTypes(analytic))
  }

  onChangeSource (ev, index, source) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(setSource(source))
    dispatch(fetchFields(source))
    dispatch(fetchAnalytics(source))
  }

  onChangeVisualization (ev, index, visualization) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(setVisualization(visualization))
  }

  render () {
    const {
      analytic,
      analytics,
      fields,
      source,
      sources,
      visualization,
      visualizationTypes
    } = this.props
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
          <SelectField
            floatingLabelText='Select a data source'
            hintText='Select a data source'
            isFetching={sources.isFetching}
            items={sources.data}
            keyProp={'_id'}
            primaryTextProp={'name'}
            style={verticalTop}
            value={source}
            valueProp={'_id'}
            onChange={this.onChangeSource}
          />
          <SelectField
            floatingLabelText='Select an analytic'
            hintText='Select an analytic'
            isFetching={analytics.isFetching}
            items={analytics.data}
            keyProp={'_id'}
            primaryTextProp={'name'}
            style={{...verticalTop, ...analyticStyle}}
            value={analytic}
            valueProp={'_id'}
            onChange={this.onChangeAnalytic}
          />
          <SelectField
            floatingLabelText='Select a visualization'
            hintText='Select a visualization'
            isFetching={visualizationTypes.isFetching}
            items={visualizationTypes.data}
            keyProp={'_id'}
            primaryTextProp={'name'}
            style={{...verticalTop, ...visualizationStyle}}
            value={visualization}
            valueProp={'_id'}
            onChange={this.onChangeVisualization}
          />
          <FilterCriteria
            fields={fields}
            style={verticalTop}
            wrapperStyle={filterStyle}
          />
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  analytic: state.analytic,
  analytics: state.analytics,
  fields: state.fields,
  filters: state.filters,
  source: state.source,
  sources: state.sources,
  visualization: state.visualization,
  visualizationTypes: state.visualizationTypes
}))(Analytics)