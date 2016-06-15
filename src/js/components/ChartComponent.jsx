import * as Components from 'safe-framework'
import React, {Component, PropTypes} from 'react'

export class ChartComponent extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    metadata: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
  }

  render () {
    const {data, metadata, type} = this.props
    const {visualizationParams: params = {}} = metadata
    const {series, yAxis = 'Count', type: xAxisType, drillDownFieldName} = params
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
        drilldown={drillDownFieldName != null}
        options={options}
        ref='chart'
        onClick={(dataItem, series, datasetIndex) => {
          if (!drillDownFieldName) {
            return
          }

          const {chart} = this.refs

          chart.drilldown({
            ...chartData,
            data: dataItem[drillDownFieldName]
          })
        }}
      />
    )
  }
}