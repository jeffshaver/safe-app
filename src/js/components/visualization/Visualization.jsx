import {ChartComponent} from './ChartComponent'
import CircularProgress from 'material-ui/CircularProgress'
import {connect} from 'react-redux'
import {fetchVisualizationResults} from '../../modules/visualization-results'
import {MapComponent} from './MapComponent'
import {SummaryComponent} from './SummaryComponent'
import {TableComponent} from './TableComponent'
import VisualizationToolbar from './VisualizationToolbar'
import {excludeEmptyFilters, generateMenuItems} from '../../modules/utilities'
import React, {Component, PropTypes} from 'react'

const components = {ChartComponent, MapComponent, SummaryComponent, TableComponent}
const style = {
  container: {
    height: '100%'
  }
}
const getTypeGroup = (type) => {
  if (components[`${type}Component`]) {
    return type
  }

  return 'Chart'
}

class Visualization extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    filters: PropTypes.array,
    results: PropTypes.object,
    visualization: PropTypes.object.isRequired
  }

  static defaultProps = {
    filters: [],
    results: {}
  }

  componentWillMount () {
    const {dispatch, visualization, filters} = this.props
    const {visualizationType} = visualization
    const {name: type} = visualizationType

    this._menuItems = generateMenuItems(getTypeGroup(type), [visualization, this])

    dispatch(fetchVisualizationResults(
      visualization._id, excludeEmptyFilters(filters))
    )
  }

  componentWillUnmount () {
    this._menuItems = undefined
    // const {dispatch} = this.props
    // dispatch(removeVisualizationResults())
  }

  render () {
    const {visualization, results} = this.props
    const {name, visualizationType} = visualization

    if (!results) {
      return null
    }

    if (results.isFetching) {
      return (
        <span style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          'transform': 'translate(-50%, -50%)'
        }}>
        <CircularProgress
          size={0.5}
          style={{
            left: '.5em',
            top: '1.2em'
          }}
        /> Loading...
        </span>
      )
    }

    const {data = []} = results
    const {name: visualizationTypeName} = visualizationType

    if (data.length === 0) {
      return <div />
    }

    let visualizationComponentName = visualizationTypeName

    if (!['Map', 'Table', 'Summary'].includes(visualizationTypeName)) {
      visualizationComponentName = 'Chart'
    }

    const VisualizationComponent = components[`${visualizationComponentName}Component`]

    return (
      <div style={style.container}>
        <VisualizationToolbar
          menuItems={this._menuItems}
          title={name}
        />
        <VisualizationComponent
          data={data}
          metadata={visualization}
          name={name}
          ref={(ref) => (this._component = ref)}
          type={visualizationTypeName}
        />
      </div>
    )
  }
}

export default connect((state, ownProps) => ({
  filters: state.filters
}))(Visualization)