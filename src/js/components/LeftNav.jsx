import ActionHelp from 'material-ui/svg-icons/action/help'
import Avatar from 'material-ui/Avatar'
import {browserHistory} from 'react-router'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import ListItem from 'material-ui/List/ListItem'
import {logoStyle} from '../styles/common'
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
const openInNewTab = (url) => {
  const win = window.open(url, '_blank')

  if (!win) {
    return
  }

  win.focus()
}

export class LeftNav extends Component {
  render () {
    const routeNames = Object.keys(routes)

    return (
      <Drawer
        ref='leftNav'
        width={110}
      >
        <ListItem
          innerDivStyle={logoStyle}
          key={0}
          style={style.logoWrapper}
          onTouchTap={() => (browserHistory.push('/'))}
        >
          <h1>{applicationName}</h1>
        </ListItem>
        <Divider />
        {
          routeNames.map((routeName, i) => {
            const route = routes[routeName]
            const AvatarComponent = route.avatar

            if (!route.enabled || routeName === 'Home') return

            return (
              <ListItem
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
              </ListItem>
            )
          })
        }
        {
          helpMenuItems.length > 0
          ? (
            <ListItem
              leftAvatar={
                <Avatar
                  icon={<ActionHelp />}
                />
              }
              nestedItems={
                helpMenuItems.map((helpItem, i) => (
                  <ListItem
                    key={i}
                    primaryText={helpItem.title}
                    onTouchTap={() => {openInNewTab(helpItem.link)}}
                  />
                ))
              }
              primaryText='Help'
              primaryTogglesNestedList={true}
            />
          )
          : ('')
        }
      </Drawer>
    )
  }
}