import * as Components from 'safe-framework'
import React, {PropTypes} from 'react'

export const ChartComponent = ({data, metadata, type}) => {
  const {visualizationParams: params = {}} = metadata
  const {series, yAxis = 'Count'} = params
  const options = {
    scales: {
      xAxis: [{}],
      yAxes: [{
        scaleLabel: {
          display: false,
          labelString: ''
        }
      }]
    }
  }
  const chartData = {
    data,
    xAxis: ['Value']
  }

  if (series) {
    chartData.ySeriesField = 'Details'
    chartData.ySeriesFieldName = 'Value'
    chartData.ySeriesFieldValue = yAxis
  } else {
    chartData.yAxis = [yAxis]
    options.legend = {
      display: false
    }
  }

  const ChartType = Components[`${type}Chart`]

  return (
    <ChartType
      data={chartData}
      options={options}
    />
  )
}

ChartComponent.propTypes = {
  data: PropTypes.array.isRequired,
  metadata: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
}