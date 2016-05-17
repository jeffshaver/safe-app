import {Map} from 'safe-framework'
import React, {PropTypes} from 'react'

export const MapComponent = ({data, metadata, type}) => {
  const {Label, Latitude = 'Latitude', Longitude = 'Longitude'} = metadata
  const [firstItem = {}] = data
  const markers = data.map((row, i) => ({
    key: i,
    position: [row[Latitude], row[Longitude]],
    children: row[Label]
  }))
  const center = [firstItem[Latitude], firstItem[Longitude]]

  return (
    <Map
      center={center}
      markers={markers}
    />
  )
}

MapComponent.propTypes = {
  data: PropTypes.array.isRequired,
  metadata: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
}