import ActionHelp from 'material-ui/svg-icons/action/help'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import {browserHistory} from 'react-router'
import Drawer from 'material-ui/Drawer'
import FlatButton from 'material-ui/FlatButton'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import IconButton from 'material-ui/IconButton'
import {logoStyle} from '../styles/common'
import MenuItem from 'material-ui/MenuItem'
import {routes} from '../constants'
import {applicationName, helpMenuItems} from '../../../config'
import React, {Component} from 'react'

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

export class LeftNav extends Component {
  render () {
    const routeNames = Object.keys(routes)

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
            style={{...style.button, ...logoStyle}}
            tooltip={applicationName}
            tooltipPosition='top-center'
            tooltipStyles={style.tooltip}
          />
        </MenuItem>
        {
          routeNames.map((routeName, i) => {
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
        {
          helpMenuItems.length > 0
          ? (
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
          : null
        }
      </Drawer>
    )
  }
}