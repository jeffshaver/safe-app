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
        }, []
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
          padding={10}
          style={style.gridList}
        >
          {
            visualizations.map((visualization, i) => {
              const visualizationSize = visualizationSizes[visualization._id] || {}
              const {
                // remove typeof check once mongodb change is in place
                cols = (typeof visualizationSize !== 'object' ? visualizationSize : 2),
                rows = 1
              } = visualizationSize
              const results = visualizationResults[visualization._id]

              return (
                <GridTile
                  cols={cols}
                  key={visualization._id}
                  rows={rows}
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