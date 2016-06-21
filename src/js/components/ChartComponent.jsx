import * as Components from 'safe-framework'
import React, {Component, PropTypes} from 'react'

const style = {
  canvas: {
    margin: '1em 0'
  }
}

export class ChartComponent extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    metadata: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
  }

  render () {
    const {data, metadata, type} = this.props
    const {visualizationParams: params = {}} = metadata
    const {
      drillDownFieldName,
      series,
      tooltipFields,
      type: xAxisType,
      yAxis = 'Count'
    } = params
    const xAxisScale = xAxisType !== 'timeline' ? {} : {
      time: {
        tooltipFormat: 'dddd, MMMM Do YYYY, hh:mm'
      },
      type: 'time'
    }
    const options = {
      scales: {
        xAxes: [xAxisScale],
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
      chartData.yAxis = [{
        dataProperty: yAxis,
        label: yAxis
      }]
      options.legend = {
        display: false
      }
    }

    if (tooltipFields) {
      options.tooltips = {
        callbacks: {
          afterLabel: (tooltipItem, data) => {
            const {data: dataList = [], ySeriesField} = data
            let dataItem = dataList[tooltipItem.index]
            let tooltipLabel = ''

            if (ySeriesField) {
              dataItem = dataItem[ySeriesField]
            }

            for (const tooltipField of tooltipFields) {
              tooltipLabel += `${tooltipField}: ${dataItem[tooltipField]}`
            }

            return tooltipLabel
          }
        }
      }
    }

    const ChartType = Components[`${type}Chart`]

    return (
      <ChartType
        data={chartData}
        drilldown={drillDownFieldName != null}
        options={options}
        ref='chart'
        style={style.canvas}
        onClick={(dataItem, seriesItem) => {
          if (!drillDownFieldName) {
            return
          }

          const {chart} = this.refs

          chart.drilldown({
            ...chartData,
            data: (seriesItem || dataItem)[drillDownFieldName]
          })
        }}
      />
    )
  }
}