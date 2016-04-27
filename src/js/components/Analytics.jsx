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
            style={style.verticalTop}
            wrapperStyle={filterStyle}
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