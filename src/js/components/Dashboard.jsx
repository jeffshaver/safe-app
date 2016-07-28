import {connect} from 'react-redux'
import {excludeEmptyFilters} from '../modules/utilities'
import {fetchVisualizationResults} from '../modules/visualization-results'
import FilterCriteria from './FilterCriteria'
import {Hydrateable} from '../decorators/Hydrateable'
import {setDefaultFilters} from '../modules/filters'
import {verticalTop} from '../styles/common'
import Visualization from './visualization/Visualization'
import {GridList, GridTile} from 'material-ui/GridList'
import React, {Component, PropTypes} from 'react'

const style = {
  gridList: {
    width: '100%',
    height: '60%',
    overflowY: 'auto',
    marginBottom: 24
  },
  gridTile: {
    boxSizing: 'border-box',
    height: '500px'
  },
  visualization: {
    height: '100%'
  }
}

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

  render () {
    const {dashboard} = this.props

    if (!dashboard) {
      return null
    }

    const {dispatch, visualizationResults} = this.props
    const {dashboardParams = {}, visualizations = []} = dashboard
    const {size = 2, visualizationSizes = []} = dashboardParams
    // Populate the Fields based off of the fields
    // for each visualization's source.
    const fields = {
      data: [...(new Set(visualizations.reduce(
        (array, visualization) => {
          const {fields = []} = visualization.source

          return [...array, ...fields]
        }
      )))],
      isFetching: false
    }

    return (
      <div>
        <FilterCriteria
          fields={fields}
          headerStyle={{
            margin: 0
          }}
          showFilterButton={true}
          style={{
            ...verticalTop,
            marginBottom: '1em'
          }}
          onClickFilter={this.onClickFilter}
        />
        <GridList
          cellHeight={500}
          cols={visualizations.length > 1 ? size : 1}
          padding={0}
          style={style.gridList}
        >
          {
            visualizations.map((visualization, i) => {
              const isFirst = i === 0
              const isFirstTwo = isFirst || i === 1
              const isLast = i === visualizations.length - 1
              const isLastTwo = isLast || i === visualizations.length - 2
              const size = visualizationSizes[visualization._id]
              const results = visualizationResults[visualization._id]
              let padding = '10px'

              if (isFirst && size === 2 || isFirstTwo && size === 1) {
                padding = '0px 10px 10px 10px'
              }

              if (isLast && size === 2 || isLastTwo && size === 1) {
                padding = '10px 10px 0px 10px'
              }

              return (
                <GridTile
                  cols={size}
                  key={visualization._id}
                  style={{
                    ...(results && results.isFetching ? {} : style.gridTile),
                    padding
                  }}
                >
                  <Visualization
                    dispatch={dispatch}
                    results={results}
                    visualization={visualization}
                  />
                </GridTile>
              )
            })
          }
        </GridList>
      </div>
    )
  }
}

export default connect((state, ownProps) => ({
  filters: state.filters,
  visualizationResults: state.visualizationResults
}))(Dashboard)