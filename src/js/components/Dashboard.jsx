import {connect} from 'react-redux'
import {excludeEmptyFilters} from '../modules/utilities'
import {fetchVisualizationResults} from '../modules/visualization-results'
import FilterCriteria from './FilterCriteria'
import {Hydrateable} from '../decorators/Hydrateable'
import {LogMetrics} from '../decorators'
import {verticalTop} from '../styles/common'
import Visualization from './visualization/Visualization'
import React, {Component, PropTypes} from 'react'
import ReactGridLayout, {WidthProvider} from 'react-grid-layout'
import {resetFilters, setDefaultFilters} from '../modules/filters'

const GridLayout = WidthProvider(ReactGridLayout)
const gridMargin = 10
const style = {
  gridList: {
    marginBottom: 24,
    marginLeft: -gridMargin,
    marginRight: -gridMargin,
    width: `calc(100% + ${gridMargin * 2}px)`
  },
  gridTile: {
    height: '100%',
    overflow: 'visible'
  },
  gridTileLoading: {
    boxSizing: 'border-box'
  },
  visualization: {
    height: '100%'
  }
}

@LogMetrics('Dashboard', ['dashboard.title', 'dashboard._id'])
@Hydrateable('Dashboard', ['filters'], 'dashboard._id')
class Dashboard extends Component {
  static propTypes = {
    dashboard: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,
    visualizationResults: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.onClickFilter = ::this.onClickFilter
    this.onClickReset = ::this.onClickReset
  }

  componentWillMount () {
    const {dashboard, dispatch} = this.props

    const {dashboardParams = {}} = dashboard
    const {filters: dashboardFilters = []} = dashboardParams

    if (dashboardFilters && dashboardFilters.length > 0) {
      dispatch(setDefaultFilters(dashboardFilters))
    }
  }

  onClickFilter () {
    const {dispatch, filters, dashboard} = this.props
    const {visualizations} = dashboard

    for (const visualization of visualizations) {
      const {_id = null} = visualization

      if (!_id) {
        return
      }

      dispatch(fetchVisualizationResults(
        _id, excludeEmptyFilters(filters))
      )
    }
  }

  onClickReset () {
    const {dispatch, dashboard} = this.props

    const {dashboardParams = {}} = dashboard
    const {filters: dashboardFilters = []} = dashboardParams

    if (dashboardFilters && dashboardFilters.length > 0) {
      dispatch(resetFilters(dashboardFilters))
    } else {
      const filter = {
        field: '',
        operator: '',
        value: ''
      }

      dispatch(resetFilters([filter]))
    }
  }

  renderVisualizationGrid () {
    const {dashboard} = this.props
    const {dashboardParams = {}, visualizations = []} = dashboard
    const {size = 2, layout} = dashboardParams
    const totalCols = visualizations.length > 1 ? Number(size) : 1

    return (
      <GridLayout
        cols={totalCols}
        draggableHandle={'.visualizationToolbar'}
        layout={layout}
        rowHeight={250}
        style={style.gridList}
      >
        {visualizations.map(this.renderVisualization, this)}
      </GridLayout>
    )
  }

  renderVisualization (visualization, i) {
    const {dashboard, dispatch, visualizationResults} = this.props
    const {dashboardParams = {}, visualizations = []} = dashboard
    const {size = 2, visualizationSizes = []} = dashboardParams
    const visualizationSize = visualizationSizes[visualization._id] || {}
    const {
      // remove typeof check once mongodb change is in place
      cols = (typeof visualizationSize !== 'object' ? visualizationSize : 1),
      rows = 1
    } = visualizationSize
    const results = visualizationResults[visualization._id]
    const totalCols = visualizations.length > 1 ? Number(size) : 1

    return (
      <div
        data-grid={{x: i % totalCols, y: Math.floor(i / totalCols), w: Number(cols), h: Number(rows) * 2}}
        key={visualization._id}
        style={{
          ...style.gridTile,
          ...(results && results.isFetching ? {} : style.gridTileLoading)
        }}
      >
        <Visualization
          dispatch={dispatch}
          results={results}
          visualization={visualization}
        />
      </div>
    )
  }

  render () {
    const {dashboard} = this.props

    if (!dashboard) {
      return null
    }

    const {_id, title, visualizations} = dashboard

    // Populate the Fields based off of the fields
    // for each visualization's source.
    const fields = {
      data: [...(new Set(visualizations.reduce(
        (array, visualization) => {
          const {fields = []} = visualization.source

          return [...array, ...fields]
        }, []
      )))],
      isFetching: false
    }

    const label = `Dashboard_${title}_${_id}`

    return (
      <div>
        <FilterCriteria
          fields={fields}
          headerStyle={{
            margin: 0
          }}
          label={label}
          showFilterButton={true}
          style={{
            ...verticalTop,
            marginBottom: '1em'
          }}
          onClickFilter={this.onClickFilter}
          onClickReset={this.onClickReset}
        />
        {this.renderVisualizationGrid()}
      </div>
    )
  }
}

export default connect((state, ownProps) => ({
  filters: state.filters,
  visualizationResults: state.visualizationResults
}))(Dashboard)