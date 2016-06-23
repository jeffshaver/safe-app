import ActionHelp from 'material-ui/svg-icons/action/help'
import Avatar from 'material-ui/Avatar'
import {browserHistory} from 'react-router'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import ListItem from 'material-ui/List/ListItem'
import {logoStyle} from '../styles/common'
import {routes} from '../constants'
import {applicationName, helpMenuItems} from '../../../config'
import React, {Component} from 'react'

const openInNewTab = (url) => {
  const win = window.open(url, '_blank')

  if (!win) {
    return
  }

  win.focus()
}

export class LeftNav extends Component {
  render () {
    return (
      <Drawer
        ref='leftNav'
        width={175}
      >
        <ListItem
          innerDivStyle={logoStyle}
          key={0}
          onTouchTap={() => (browserHistory.push('/'))}
        >
          <h1>{applicationName}</h1>
        </ListItem>
        <Divider />
        {
          routes.map((route, i) => {
            const AvatarComponent = route.avatar

            if (!route.enabled) return

            return (
              <ListItem
                key={i}
                leftAvatar={
                  <Avatar
                    icon={<AvatarComponent />}
                  />
                }
                onTouchTap={() => (browserHistory.push(`/${route.path}`))}
              >
                {route.name}
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