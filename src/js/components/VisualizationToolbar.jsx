import {connect} from 'react-redux'
import Toolbar from 'material-ui/Toolbar/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle'
import React, {PropTypes} from 'react'

const VisualizationToolbar = ({title}) => (
  <Toolbar>
    <ToolbarGroup float='left'>
      <ToolbarTitle text={title} />
    </ToolbarGroup>
    <ToolbarGroup float='right'>
      {/* Icons to float to right */}
    </ToolbarGroup>
  </Toolbar>
)

VisualizationToolbar.propTypes = {
  title: PropTypes.string.isRequired
}

VisualizationToolbar.defaultProps = {
  title: 'Visualization'
}

export default connect()(VisualizationToolbar)