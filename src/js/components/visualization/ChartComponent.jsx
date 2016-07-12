import * as Components from 'safe-framework'
import React, {Component, PropTypes} from 'react'

const style = {
  canvas: {
    margin: '1em 0'
  },
  container: {
    height: '85%'
  }
}

export class ChartComponent extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    metadata: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
  }

  getItemData (seriesItem, dataItem, drillDownFieldName) {
    if (seriesItem && seriesItem[drillDownFieldName]) {
      return seriesItem[drillDownFieldName]
    }

    return dataItem[drillDownFieldName]
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

    if (xAxisType === 'timeline') {
      options.pan = {
        enabled: true,
        mode: 'x'
      }

      options.zoom = {
        enabled: true,
        mode: 'x'
      }
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
            const tooltipLabels = []

            if (ySeriesField) {
              dataItem = dataItem[ySeriesField][tooltipItem.datasetIndex]
            }

            for (const tooltipField of tooltipFields) {
              tooltipLabels.push(`${tooltipField}: ${dataItem[tooltipField]}`)
            }

            return tooltipLabels
          }
        }
      }
    }

    const ChartType = Components[`${type}Chart`]

    return (
      <ChartType
        containerStyle={style.container}
        data={chartData}
        drilldown={drillDownFieldName != null}
        options={options}
        ref={(ref) => (this._chart = ref)}
        style={style.canvas}
        onClick={(dataItem, seriesItem) => {
          if (!drillDownFieldName) {
            return
          }

          const data = this.getItemData(
            seriesItem,
            dataItem,
            drillDownFieldName
          )

          this._chart.drilldown({
            ...chartData,
            data
          })
        }}
      />
    )
  }
}