import changeCase from 'change-case'
import Download from 'material-ui/svg-icons/file/file-download'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import {saveCanvas} from '../../modules/utilities'
import React, {Component, PropTypes} from 'react'

export class ChartMenu extends Component {
  static propTypes = {
    metadata: PropTypes.object.isRequired,
    visualization: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.onTouchTap = ::this.onTouchTap
  }

  onTouchTap (event) {
    const {metadata, visualization} = this.props
    const {_chart} = visualization._component
    const {name} = metadata

    saveCanvas(
      _chart.getChartCanvas(),
      changeCase.pascalCase(name) + '.png'
    )
  }

  render () {
    return (
      <span>
        <MenuItem
          key='saveChart'
          leftIcon={<Download />}
          primaryText='Save'
          onTouchTap={this.onTouchTap}
        />
      </span>
    )
  }
}