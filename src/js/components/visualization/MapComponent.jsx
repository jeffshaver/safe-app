import {Map} from 'safe-framework'
import {mapTileLayer} from '../../../../config'
import React, {Component, PropTypes} from 'react'

export class MapComponent extends Component {
  static propTypes = {
    data: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array
    ]),
    metadata: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      baseLayer: {data: []},
      layers: []
    }
  }

  saveState () {
    let {data} = this.props

    if (Array.isArray(data)) {
      data = {baseData: data}
    }

    const {baseData, layers = []} = data

    this.setState({
      baseLayer: {data: baseData},
      layers,
      tileLayerOptions: !mapTileLayer ? {} : {...mapTileLayer}
    })
  }

  componentWillMount () {
    this.saveState()
  }

  componentWillUpdate () {
    this.saveState()
  }

  shouldComponentUpdate (nextProps) {
    return this.props.data !== nextProps.data
  }

  render () {
    const {metadata} = this.props
    const {visualizationParams} = metadata
    const {title} = visualizationParams
    const {
      baseLayer,
      layers,
      tileLayerOptions
    } = this.state

    return (
      <Map
        baseLayer={baseLayer}
        dataOptions={visualizationParams}
        layers={layers}
        tileLayerOptions={tileLayerOptions}
        title={title}
        wms={tileLayerOptions.wms}
      />
    )
  }
}