import * as FrameworkTypes from 'safe-framework'
import {ChartComponent} from './visualization/ChartComponent'
import {ChartMenu} from './visualization/ChartMenu'
import {connect} from 'react-redux'
import {excludeEmptyFilters} from '../modules/utilities'
import {fetchVisualizationResults} from '../modules/visualization-results'
import FilterCriteria from './FilterCriteria'
import {Hydrateable} from '../decorators/Hydrateable'
import {MapComponent} from './visualization/MapComponent'
import {setDefaultFilters} from '../modules/filters'
import {SummaryComponent} from './visualization/SummaryComponent'
import {TableComponent} from './visualization/TableComponent'
import {TableMenu} from './visualization/TableMenu'
import React, {Component, PropTypes} from 'react'

const componentTypes = {ChartComponent, MapComponent, TableComponent, SummaryComponent}
const menuTypes = {ChartMenu, TableMenu}

const {Dashboard: FrameworkDashboard} = FrameworkTypes

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

    this.fetchVisualizationResults = ::this.fetchVisualizationResults
    this.onClickFilter = ::this.onClickFilter
    this.getComponentType = ::this.getComponentType
    this.onDashboardWillMount = ::this.onDashboardWillMount
    this.getMenuType = ::this.getMenuType
  }

  onDashboardWillMount (dashboard) {
    const {dispatch} = this.props

    const {dashboardParams = {}} = dashboard
    const {filters: dashboardFilters = []} = dashboardParams

    if (dashboardFilters && dashboardFilters.length > 0) {
      dispatch(setDefaultFilters(dashboardFilters))
    }
  }
  
  fetchVisualizationResults (visualization) {
    const {dispatch, filters} = this.props

    dispatch(fetchVisualizationResults(
      visualization._id, excludeEmptyFilters(filters))
    )
  }
  
  getComponentType (type, visualization) {
    return componentTypes[`${this.getTypeName(type)}Component`]
  }
  
  getMenuType (type, visualization) {
    return menuTypes[`${this.getTypeName(type)}Menu`]
  }
  
  getTypeName (type) {
    if (FrameworkTypes[`${type}Chart`]) {
      return 'Chart'
    }
    
    return type
  }
  
  getFields (dashboard) {
    const {visualizations = []} = dashboard || {}
    
    if (visualizations.length === 0) {
      return {data: []}
    }
    
    // Populate the Fields based off of the fields
    // for each visualization's source.
    return {
      data: [...(new Set(visualizations.reduce(
        (array, visualization) => {
          const {fields = []} = visualization.source

          return [...array, ...fields]
        },
      [])))],
      isFetching: false
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

  render () {
    const {dashboard, filters, visualizationResults} = this.props
    const {_id: dashboardId} = dashboard

    const dashboardHeader = [(
      <FilterCriteria
        fields={this.getFields(dashboard)}
        filters={filters}
        headerStyle={{
          margin: 0
        }}
        key={`dashboardFilter${dashboardId}`}
        showFilterButton={true}
        style={{
          verticalAlign: 'top',
          marginBottom: '1em'
        }}
        onClickFilter={this.onClickFilter}
      />
    )]

    return (
      <div>
        <FrameworkDashboard
          dashboard={dashboard}
          getComponentType={this.getComponentType}
          header={dashboardHeader}
          key={dashboardId}
          visualizationResults={visualizationResults}
          onVisualizationMount={this.fetchVisualizationResults}
          onWillMount={this.onDashboardWillMount}
        />
      </div>
    )
  }
}

export default connect((state, ownProps) => ({
  filters: state.filters,
  visualizationResults: state.visualizationResults
}))(Dashboard)