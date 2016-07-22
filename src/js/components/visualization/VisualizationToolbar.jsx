import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton/IconButton'
import IconMenu from 'material-ui/IconMenu/IconMenu'
// import MenuItem from 'material-ui/MenuItem/MenuItem'
// import NavigationClose from 'material-ui/svg-icons/navigation/close'
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
    rightIcons: PropTypes.array,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func
  }

  static defaultProps = {
    menuItems: [],
    rightIcons: [],
    onClose: () => {}
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
        {/* <MenuItem
          key='close'
          leftIcon={<NavigationClose />}
          primaryText='Remove'
          onTouchTap={onClose}
        /> */}
      </IconMenu>
    )
  }

  render () {
    const {rightIcons, title} = this.props

    return (
      <Toolbar
        className={'visualizationToolbar'}
        style={style.toolbar}
      >
        <ToolbarGroup>
          <ToolbarTitle text={title} />
        </ToolbarGroup>
        <ToolbarGroup>
          <div>
            {this.renderMenuItems()}
            {rightIcons}
          </div>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default connect()(VisualizationToolbar)