import {ChartComponent} from './ChartComponent'
import {CircularProgress} from 'safe-framework'
import {fetchVisualizationResults} from '../../modules/visualization-results'
import {LogMetrics} from '../../decorators'
import {MapComponent} from './MapComponent'
import {SummaryComponent} from './SummaryComponent'
import {TableComponent} from './TableComponent'
import VisualizationToolbar from './VisualizationToolbar'
import {excludeEmptyFilters, filtersToArray, generateMenuItems} from '../../modules/utilities'
import {grey300, white} from 'material-ui/styles/colors'
import React, {Component, PropTypes} from 'react'

const components = {ChartComponent, MapComponent, SummaryComponent, TableComponent}
const style = {
  container: {
    background: white,
    border: `1px solid ${grey300}`,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden'
  }
}
const getTypeGroup = (type) => {
  if (components[`${type}Component`]) {
    return type
  }

  return 'Chart'
}

@LogMetrics('Visualization', ['visualization.name', 'visualization._id'])
class Visualization extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    filters: PropTypes.object,
    results: PropTypes.object,
    visualization: PropTypes.object.isRequired
  }

  static defaultProps = {
    filters: {},
    results: {}
  }

  componentWillMount () {
    const {dispatch, visualization, filters, results} = this.props
    const {visualizationType} = visualization
    const {name: type} = visualizationType

    this._menuItems = generateMenuItems(getTypeGroup(type), [visualization, this])

    if (results.data) {
      return
    }

    dispatch(fetchVisualizationResults(
      visualization._id, excludeEmptyFilters(filtersToArray(filters)))
    )
  }

  componentWillUnmount () {
    this._menuItems = undefined
    // const {dispatch} = this.props
    // dispatch(removeVisualizationResults())
  }

  getVisualization () {
    const {visualization} = this.props
    const {visualizationType: {name: type}} = visualization
    const typeGroup = getTypeGroup(type)
    const {_component: {_component: component} = {}} = this

    return {
      component,
      type,
      typeGroup
    }
  }

  renderLoading () {
    const {visualization} = this.props
    const {name} = visualization

    return (
      <div style={style.container}>
        <VisualizationToolbar
          title={name}
        />
        <div style={{flex: 1, position: 'relative'}}>
          <CircularProgress
            size={0.5}
            spanStyle={{
              left: '50%',
              position: 'absolute',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            style={{
              verticalAlign: 'middle'
            }}
          />
        </div>
      </div>
    )
  }

  renderNoData () {
    const {visualization} = this.props
    const {name} = visualization

    return (
      <div style={style.container}>
        <VisualizationToolbar
          title={name}
        />
        <div style={{flex: 1, position: 'relative'}}>
          <span
            style={{
              left: '50%',
              position: 'absolute',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >No data</span>
        </div>
      </div>
    )
  }

  renderVisualization () {
    const {results, visualization} = this.props
    const {data = []} = results
    const {name, visualizationType} = visualization
    const {name: visualizationTypeName} = visualizationType
    let visualizationComponentName = visualizationTypeName

    if (!['Map', 'Table', 'Summary'].includes(visualizationTypeName)) {
      visualizationComponentName = 'Chart'
    }

    const VisualizationComponent = components[`${visualizationComponentName}Component`]

    return (
      <div
        style={style.container}
      >
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

  render () {
    const {results} = this.props
    const {data = []} = results

    if (results.isFetching) {
      return this.renderLoading()
    }

    if (data.length === 0) {
      return this.renderNoData()
    }

    return this.renderVisualization()
  }
}

export default Visualization