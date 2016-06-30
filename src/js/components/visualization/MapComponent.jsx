import {Map} from 'safe-framework'
import {mapAttribution, mapUrl} from '../../../../config'
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

  render () {
    let {data} = this.props
    const {metadata} = this.props
    const {visualizationParams} = metadata
    const {title} = visualizationParams

    if (Array.isArray(data)) {
      data = {baseData: data}
    }

    const {baseData, layers = []} = data

    const baseLayer = {
      data: baseData
    }

    const tileLayerOptions = !mapUrl ? {} : {
      attribution: mapAttribution,
      transparent: true,
      url: mapUrl
    }

    return (
      <Map
        baseLayer={baseLayer}
        dataOptions={visualizationParams}
        layers={layers}
        tileLayerOptions={tileLayerOptions}
        title={title}
      />
    )
  }
}