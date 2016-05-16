import * as Components from 'safe-framework'
import React, {Component, PropTypes} from 'react'

export default class ChartComponent extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    metadata: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
  }
  
  render () {
    const {data, metadata, type} = this.props
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
    
    // Find the Chart based off of the provided type.
    const ChartType = Components[`${type}Chart`]
    
    return (
      <ChartType
        data={chartData}
        options={options}
      />
    )
  }
}