import {ChartComponent} from './ChartComponent'
import {ChartMenu} from './ChartMenu'
import CircularProgress from 'material-ui/CircularProgress'
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
    height: '100%'
  }
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

    dispatch(fetchVisualizationResults(
      visualization._id, excludeEmptyFilters(filters))
    )
  }

  componentWillUnmount () {
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
