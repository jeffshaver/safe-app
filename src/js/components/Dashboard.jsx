import {connect} from 'react-redux'
import {fetchVisualizationResults} from '../modules/visualization-results'
import FilterCriteria from './FilterCriteria'
import {LogMetrics} from '../decorators'
import {setFilters} from '../modules/filters'
import uniqBy from 'lodash.uniqby'
import {verticalTop} from '../styles/common'
import Visualization from './visualization/Visualization'
import {excludeEmptyFilters, filtersToArray, getDefaultFilters, validateFilters} from '../modules/utilities'
import React, {Component, PropTypes} from 'react'
import ReactGridLayout, {WidthProvider} from 'react-grid-layout'

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
class Dashboard extends Component {
  static propTypes = {
    dashboard: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,
    visualizationResults: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.onClickSubmit = ::this.onClickSubmit
    this.onClickReset = ::this.onClickReset
  }

  componentWillMount () {
    const {dashboard, filters} = this.props

    if (filters[dashboard._id]) return

    this.resetFilters()
  }

  validateFilters = () => {
    const {dashboard, filters} = this.props

    return validateFilters(filters[dashboard._id])
  }

  getUniqueFields = () => {
    const {dashboard: {visualizations}} = this.props
    const sources = visualizations.map((visualization) => visualization.source)

    return uniqBy(sources.reduce((fields, {fields: sourceFields = []} = {}) => (
      [...fields, ...sourceFields]
    ), []), 'name')
  }

  resetFilters () {
    const {dashboard, dispatch} = this.props
    const {dashboardParams = {}} = dashboard
    const {filters: dashboardFilters = []} = dashboardParams
    const fields = this.getUniqueFields()
    const defaultFilters = getDefaultFilters(fields, dashboardFilters)

    dispatch(
      setFilters(
        dashboard._id,
        defaultFilters
      )
    )
  }

  onClickSubmit () {
    const {dispatch, filters, dashboard} = this.props
    const {visualizations} = dashboard

    for (const visualization of visualizations) {
      const {_id = null} = visualization

      if (!_id) {
        return
      }

      dispatch(fetchVisualizationResults(
        _id, excludeEmptyFilters(filtersToArray(filters, dashboard._id))
      ))
    }
  }

  onClickReset () {
    this.resetFilters()
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
        onResizeStop={(layout, item) => {
          const visualization = this._visualizations[item.i]
          const {
            component,
            typeGroup
          } = visualization.getVisualization()
          const isChart = typeGroup === 'Chart'

          if (!isChart) return

          window.requestAnimationFrame(component.resize)
        }}
      >
        {visualizations.map(this.renderVisualization, this)}
      </GridLayout>
    )
  }

  renderVisualization (visualization, i) {
    const {dashboard, filters, visualizationResults} = this.props
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
    const visualizationElement = filters[dashboard._id]
      ? (
        <Visualization
          filters={filters[dashboard._id]}
          ref={(ref) => {
            if (!ref) {
              this._visualizations = ref

              return
            }

            if (!this._visualizations) {
              this._visualizations = {}
            }

            this._visualizations[ref.props.visualization._id] = ref.getWrappedInstance()._component
          }}
          results={results}
          visualization={visualization}
        />
      )
      : null

    return (
      <div
        data-grid={{x: i % totalCols, y: Math.floor(i / totalCols), w: Number(cols), h: Number(rows) * 2}}
        key={visualization._id}
        style={{
          ...style.gridTile,
          ...(results && results.isFetching ? {} : style.gridTileLoading)
        }}
      >
        {visualizationElement}
      </div>
    )
  }

  render () {
    const {dashboard} = this.props

    if (!dashboard) return null

    const {_id, title} = dashboard

    const fields = {
      data: this.getUniqueFields(),
      isFetching: false
    }

    const label = `Dashboard_${title}_${_id}`

    return (
      <div>
        <FilterCriteria
          containerId={_id}
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
          valid={this.validateFilters()}
          onClickReset={this.onClickReset}
          onClickSubmit={this.onClickSubmit}
        />
        {this.renderVisualizationGrid()}
      </div>
    )
  }
}

export default connect((state) => ({
  filters: state.filters,
  visualizationResults: state.visualizationResults
}))(Dashboard)