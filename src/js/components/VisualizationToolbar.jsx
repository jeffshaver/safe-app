import {connect} from 'react-redux'
import Toolbar from 'material-ui/Toolbar/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle'
import React, {Component, PropTypes} from 'react'

class VisualizationToolbar extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }
  
  static defaultProps = {
    title: 'Visualization'
  }

  render () {
    const {title} = this.props
    
    return (
      <Toolbar>
        <ToolbarGroup float='left'>
          <ToolbarTitle text={title} />
        </ToolbarGroup>
        <ToolbarGroup float='right'>
          {/* Icons to float to right */}
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default connect()(VisualizationToolbar)