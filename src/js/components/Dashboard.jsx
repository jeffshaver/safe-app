import {connect} from 'react-redux'
import {excludeEmptyFilters} from '../modules/utilities'
import {fetchVisualizationResults} from '../modules/visualization-results'
import FilterCriteria from './FilterCriteria'
import {GridList} from 'material-ui'
import {verticalTop} from '../styles/common'
import Visualization from './Visualization'
import React, {Component, PropTypes} from 'react'

const styles = {
  gridList: {
    width: '100%',
    height: '60%',
    overflowY: 'auto',
    marginBottom: 24
  },
  visualization: {
    height: '100%'
  }
}

class Dashboard extends Component {
  static propTypes = {
    dashboard: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props)

    this.onClickFilter = ::this.onClickFilter
  }

  onClickFilter () {
    const {dispatch, filters} = this.props
    const {gridList} = this.refs
    const {children} = gridList.props

    React.Children.forEach(children, (child) => {
      const {_id = null} = child.props.visualization

      if (!_id) {
        return
      }

      dispatch(fetchVisualizationResults(
        _id, excludeEmptyFilters(filters))
      )
    })
  }

  render () {
    const {dispatch, dashboard} = this.props
    const {visualizations = []} = dashboard
    // Populate the Fields based off of the fields
    // for each visualization's source.
    const fields = {
      data: visualizations.reduce(
        (array, visualization) => {
          const {fields = []} = visualization.source
          
          return [...array, ...fields]
        }, []
      ),
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
          cols={visualizations.length > 1 ? 2 : 1}
          padding={20}
          ref='gridList'
          style={styles.gridList}
        >
          {
            visualizations.map((visualization) => (
              <Visualization
                dispatch={dispatch}
                key={visualization._id}
                visualization={visualization}
              />
            ))
          }
        </GridList>
      </div>
    )
  }
}

export default connect((state) => ({
  dashboard: state.dashboard,
  filters: state.filters
}))(Dashboard)