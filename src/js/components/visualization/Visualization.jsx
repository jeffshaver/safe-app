import {ChartComponent} from './ChartComponent'
import {ChartMenu} from './ChartMenu'
import {connect} from 'react-redux'
import {excludeEmptyFilters} from '../../modules/utilities'
import {fetchVisualizationResults} from '../../modules/visualization-results'
import {MapComponent} from './MapComponent'
import {TableComponent} from './TableComponent'
import {TableMenu} from './TableMenu'
import VisualizationToolbar from './VisualizationToolbar'
import React, {Component, PropTypes} from 'react'

const components = {ChartComponent, MapComponent, TableComponent}
const menus = {ChartMenu, TableMenu}
const style = {
  container: {
    height: '80%'
  }
}

class Visualization extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    filters: PropTypes.array,
    visualization: PropTypes.object.isRequired,
    visualizationResults: PropTypes.object.isRequired
  }

  static defaultProps = {
    filters: []
  }

  componentWillMount () {
    const {dispatch, visualization, filters} = this.props

    dispatch(fetchVisualizationResults(
      visualization._id, excludeEmptyFilters(filters))
    )
  }

  componentWillUnmount () {
    // const {dispatch} = this.props
    // dispatch(removeVisualizationResults())
  }

  render () {
    const {visualization, visualizationResults} = this.props
    const {name, visualizationType} = visualization
    const data = visualizationResults.data[visualization._id] || []
    const {name: visualizationTypeName} = visualizationType

    if (data.length === 0) {
      return <div/>
    }

    let visualizationComponentName = visualizationTypeName

    if (visualizationTypeName !== 'Map' && visualizationTypeName !== 'Table') {
      visualizationComponentName = 'Chart'
    }

    const VisualizationComponent = components[`${visualizationComponentName}Component`]
    const VisualizationMenu = menus[`${visualizationComponentName}Menu`]

    return (
      <div style={style.container}>
        <VisualizationToolbar title={name}>
          {VisualizationMenu
            ? <VisualizationMenu
              metadata={visualization}
              visualization={this}
            />
            : null
          }
        </VisualizationToolbar>
        <VisualizationComponent
          data={data}
          metadata={visualization}
          name={name}
          ref={(ref) => (this.component = ref)}
          type={visualizationTypeName}
        />
      </div>
    )
  }
}

export default connect((state) => ({
  visualizationResults: state.visualizationResults
}))(Visualization)