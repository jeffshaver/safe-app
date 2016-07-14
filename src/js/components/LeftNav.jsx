import ActionHelp from 'material-ui/svg-icons/action/help'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import {browserHistory} from 'react-router'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
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
          innerDivStyle={logoStyle}
          key={0}
          style={style.logoWrapper}
          onTouchTap={() => (browserHistory.push('/'))}
        >
          <h1>{applicationName}</h1>
        </MenuItem>
        <Divider />
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