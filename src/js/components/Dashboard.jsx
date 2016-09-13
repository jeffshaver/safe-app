import {connect} from 'react-redux'
import {fetchVisualizationResults} from '../modules/visualization-results'
import FilterCriteria from './FilterCriteria'
import {Hydrateable} from '../decorators/Hydrateable'
import {LogMetrics} from '../decorators'
import {setDefaultFilters} from '../modules/filters'
import uniqBy from 'lodash.uniqby'
import {verticalTop} from '../styles/common'
import Visualization from './visualization/Visualization'
import {createFilter, excludeEmptyFilters, validateFilters} from '../modules/utilities'
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

    this.onClickSubmit = ::this.onClickSubmit
    this.onClickReset = ::this.onClickReset
  }

  componentWillMount () {
    this.resetFilters()
  }

  validateFilters = () => {
    const {filters} = this.props

    return validateFilters(filters)
  }

  getUniqueFields = () => {
    const {dashboard: {visualizations}} = this.props
    const sources = visualizations.map((visualization) => visualization.source)

    return uniqBy(sources.reduce((fields, {fields: sourceFields = []} = {}) => (
      [...fields, ...sourceFields]
    ), []), 'name')
  }

  getOptionalFilters = (requiredFilters, dashboardFilters) => {
    const optional = dashboardFilters.filter((filter) => {
      return !requiredFilters.find((requiredFilter) => {
        return requiredFilter.field === filter.field
      })
    })

    if (optional.length === 0) {
      optional.push(createFilter())
    }

    return optional
  }

  getRequiredFilters = (requiredFields, dashboardFilters) => {
    return requiredFields
      .map((field) => {
        let newFilter = createFilter({
          field: field.name,
          required: true
        })
        const existingFilter = dashboardFilters.find((filter) => {
          return filter.field === field.name
        })

        if (existingFilter) {
          newFilter = Object.assign({}, newFilter, existingFilter)
        }

        return newFilter
      })
  }

  resetFilters () {
    const {dashboard, dispatch} = this.props
    const {dashboardParams = {}} = dashboard
    const {filters: dashboardFilters = []} = dashboardParams
    const fields = this.getUniqueFields()
    const requiredFields = fields.filter((field) => field.required)
    const required = this.getRequiredFilters(requiredFields, dashboardFilters)
    const optional = this.getOptionalFilters(required, dashboardFilters)

    dispatch(
      setDefaultFilters(
        required.concat(optional)
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
        _id, excludeEmptyFilters(filters))
      )
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
    const {dashboard, dispatch, filters, visualizationResults} = this.props
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
          filters={filters}
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
      </div>
    )
  }

  render () {
    const {dashboard} = this.props

    if (!dashboard) {
      return null
    }

    const {_id, title} = dashboard

    // Populate the Fields based off of the fields
    // for each visualization's source.
    const fields = {
      data: this.getUniqueFields(),
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
          valid={this.validateFilters()}
          onClickReset={this.onClickReset}
          onClickSubmit={this.onClickSubmit}
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