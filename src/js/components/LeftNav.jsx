import ActionHelp from 'material-ui/svg-icons/action/help'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Drawer from 'material-ui/Drawer'
import FlatButton from 'material-ui/FlatButton'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import IconButton from 'material-ui/IconButton'
import {logoStyle} from '../styles/common'
import MenuItem from 'material-ui/MenuItem'
import {routes} from '../constants'
import {applicationName, bannerText, helpMenuItems} from '../../../config'
import React, {Component, PropTypes} from 'react'

const style = {
  button: {
    display: 'block',
    height: 'auto',
    margin: '0 auto',
    padding: '1.5rem 0',
    width: '100%'
  },
  dropdownIcon: {
    cursor: 'pointer',
    left: '80%',
    margin: 0,
    right: 0,
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  logoLabel: {
    fontSize: '2rem',
    fontWeight: 400,
    padding: 0
  },
  logoWrapper: {
    textAlign: 'center'
  },
  tooltip: {
    fontSize: '0.8rem',
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)'
  }
}

@connect((state) => ({
  alerts: state.alerts
}))
export class LeftNav extends Component {
  static propTypes = {
    alerts: PropTypes.object
  }

  renderHelpMenu () {
    if (helpMenuItems.length === 0) {
      return null
    }

    return (
      <MenuItem
        innerDivStyle={{padding: 0}}
        key='Help'
        menuItems={helpMenuItems.map((item) => (
          <MenuItem
            href={item.link}
            key={item.title}
            primaryText={item.title}
            rel='noopener noreferrer'
            target={item.target || '_self'}
          />
        ))}
        rightIcon={
          <ArrowDropRight
            color={getMuiTheme().palette.textColor}
            style={style.dropdownIcon}
          />
        }
      >
        <IconButton
          disableTouchRipple={true}
          style={style.button}
          tooltip='Help'
          tooltipPosition={'top-center'}
          tooltipStyles={style.tooltip}
        >
          <ActionHelp />
        </IconButton>
      </MenuItem>
    )
  }

  renderRoutes () {
    const routeNames = Object.keys(routes)

    return routeNames.map((routeName, i) => {
      const route = routes[routeName]
      const AvatarComponent = route.avatar

      if (!route.enabled || routeName === 'Home') return

      return (
        <MenuItem
          innerDivStyle={{padding: 0}}
          key={routeName}
          onTouchTap={() => (browserHistory.push(`/${route.path}`))}
        >
          <IconButton
            disableTouchRipple={true}
            style={style.button}
            tooltip={routeName}
            tooltipPosition='top-center'
            tooltipStyles={style.tooltip}
          >
            <AvatarComponent />
          </IconButton>
        </MenuItem>
      )
    })
  }

  render () {
    const {alerts} = this.props
    const {data} = alerts
    const {text} = data
    let allLogoStyles = {
      ...style.button,
      ...logoStyle
    }

    if (bannerText && text) {
      allLogoStyles = {...allLogoStyles, padding: '2.65em 1.05em'}
    } else if (bannerText || text) {
      allLogoStyles = {...allLogoStyles, padding: '2.2em 1.05em'}
    }

    return (
      <Drawer
        ref='leftNav'
        width={110}
      >
        <MenuItem
          innerDivStyle={{padding: 0}}
          key={applicationName}
          onTouchTap={() => (browserHistory.push('/'))}
        >
          <FlatButton
            hoverColor='transparent'
            label={applicationName}
            labelStyle={style.logoLabel}
            rippleColor='transparent'
            style={allLogoStyles}
            tooltip={applicationName}
            tooltipPosition='top-center'
            tooltipStyles={style.tooltip}
          />
        </MenuItem>
        {this.renderRoutes()}
        {this.renderHelpMenu()}
      </Drawer>
    )
  }
}