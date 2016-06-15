import * as Components from 'safe-framework'
import React, {PropTypes} from 'react'

export const ChartComponent = ({data, metadata, type}) => {
  const {visualizationParams: params = {}} = metadata
  const {series, yAxis = 'Count', type: xAxisType} = params
  const xAxisScale = xAxisType !== 'timeline' ? {} : {
    time: {
      tooltipFormat: 'dddd, MMMM Do YYYY, hh:mm'
    },
    type: 'time'
  }
  const options = {
    scales: {
      xAxis: [xAxisScale],
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