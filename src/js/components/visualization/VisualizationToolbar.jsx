import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton/IconButton'
import IconMenu from 'material-ui/IconMenu/IconMenu'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import Toolbar from 'material-ui/Toolbar/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle'
import React, {Component, PropTypes} from 'react'

class VisualizationToolbar extends Component {
  static propTypes = {
    children: React.PropTypes.element,
    title: PropTypes.string.isRequired
  }
  
  static defaultProps = {
    children: null
  }
  
  render () {
    const {children, title} = this.props
    
    return (
      <Toolbar>
        <ToolbarGroup float='left'>
          <ToolbarTitle text={title} />
        </ToolbarGroup>
        <ToolbarGroup float='right'>
          {/* Icons to float to right */}
          {children
            ? <IconMenu
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              iconButtonElement={
                <IconButton touch={true}>
                  <NavigationMenu />
                </IconButton>
              }
            >
              {children}
            </IconMenu>
          : null
        }
        </ToolbarGroup>
      </Toolbar>
    )
  }

}

export default connect()(VisualizationToolbar)