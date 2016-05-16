import {Map} from 'safe-framework'
import React, {Component, PropTypes} from 'react'

export default class MapComponent extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    metadata: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
  }

  render () {
    const {data, metadata} = this.props
    const {Label, Latitude = 'Latitude', Longitude = 'Longitude'} = metadata
    const [firstItem = {}] = data

    const markers = data.map((row, i) => ({
      key: i,
      position: [row[Latitude], row[Longitude]],
      children: row[Label]
    }))
    
    const center = [firstItem[Latitude], firstItem[Latitude]]
    
    return (
      <Map
        center={center}
        markers={markers}
      />
    )
  }
}