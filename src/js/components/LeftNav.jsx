import Avatar from 'material-ui/Avatar'
import {browserHistory} from 'react-router'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import ListItem from 'material-ui/List/ListItem'
import {routes} from '../constants'
import React, {Component} from 'react'

export class LeftNav extends Component {
  render () {
    return (
      <Drawer
        ref='leftNav'
        width={175}
      >
        <ListItem
          key={0}
          onTouchTap={() => (browserHistory.push('/'))}
        >
          <h1>SAFE</h1>
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
      </Drawer>
    )
  }
}