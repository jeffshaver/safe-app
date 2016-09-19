import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton/IconButton'
import IconMenu from 'material-ui/IconMenu/IconMenu'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import Toolbar from 'material-ui/Toolbar/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle'
import React, {Component, PropTypes} from 'react'

const style = {
  iconButton: {
    margin: '0.35rem -0.75rem 0 0'
  },
  toolbar: {
    cursor: 'move'
  }
}

class VisualizationToolbar extends Component {
  static propTypes = {
    menuItems: PropTypes.node,
    title: PropTypes.string.isRequired
  }

  static defaultProps = {
    menuItems: []
  }

  renderMenuItems () {
    const {menuItems} = this.props

    if (menuItems.length === 0) return null

    return (
      <IconMenu
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        iconButtonElement={
          <IconButton
            style={style.iconButton}
            touch={true}
          >
            <NavigationMenu />
          </IconButton>
        }
        targetOrigin={{vertical: 'top', horizontal: 'right'}}
      >
        {menuItems}
      </IconMenu>
    )
  }

  render () {
    const {title} = this.props

    return (
      <Toolbar
        className={'visualizationToolbar'}
        style={style.toolbar}
      >
        <ToolbarGroup>
          <ToolbarTitle text={title} />
        </ToolbarGroup>
        <ToolbarGroup>
          {this.renderMenuItems()}
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default connect()(VisualizationToolbar)