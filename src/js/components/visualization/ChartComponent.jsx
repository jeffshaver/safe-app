import * as Components from 'safe-framework'
import React, {Component, PropTypes} from 'react'

const style = {
  container: {
    height: 'calc(100% - 88px)',
    padding: '1em 0'
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
      },
      zoom: {
        enabled: false
      }
    }
    const chartData = {
      data,
      xAxis: ['Value']
    }

    if (xAxisType === 'timeline') {
      options.pan = {
        enabled: false,
        mode: 'x'
      }

      options.zoom = {
        enabled: true,
        drag: true,
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
        display: false,
        position: 'right'
      }
    }

    if (tooltipFields) {
      options.tooltips = {
        callbacks: {
          afterLabel: (tooltipItem, data) => {
            const {
              data: dataList = [],
              datasets, ySeriesField,
              ySeriesFieldName
            } = data
            const {index: dataIndex, datasetIndex} = tooltipItem
            let dataItem = dataList[dataIndex]
            const tooltipLabels = []
            const datasetLabel = datasets[datasetIndex].label

            if (ySeriesField) {
              dataItem = dataItem[ySeriesField]
              
              for (const dataset of dataItem) {
                if (dataset[ySeriesFieldName].toUpperCase() === datasetLabel) {
                  dataItem = dataset
                  
                  break
                }
              }
            }
            
            if (!dataItem) {
              return
            }

            for (const tooltipField of tooltipFields) {
              const tooltipFieldValue = dataItem[tooltipField]

              if (tooltipFieldValue) {
                if (Array.isArray(tooltipFieldValue)) {
                  tooltipLabels.push(...tooltipFieldValue)
                } else {
                  tooltipLabels.push(`${tooltipField}: ${tooltipFieldValue}`)
                }
              }
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
        ref={(ref) => (this._component = ref)}
        onClick={(dataItem, seriesItem) => {
          if (!drillDownFieldName) {
            return
          }

          const data = this.getItemData(
            seriesItem,
            dataItem,
            drillDownFieldName
          )

          this._component.drilldown({
            ...chartData,
            data
          })
        }}
      />
    )
  }
}