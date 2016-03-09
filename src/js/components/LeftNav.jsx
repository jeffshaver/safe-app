import React, {Component} from 'react'
import {Avatar, LeftNav as MULeftNav, ListItem} from 'material-ui'
// SVG
import ActionAssessment from 'material-ui/lib/svg-icons/action/assessment'
import ActionHome from 'material-ui/lib/svg-icons/action/home'
import ActionSearch from 'material-ui/lib/svg-icons/action/search'
import ActionSettings from 'material-ui/lib/svg-icons/action/settings'
import FileFolder from 'material-ui/lib/svg-icons/file/folder'

const style = {
  nav: {
    margin: '64px 0 0px 0',
    padding: '10px 0 0 0'
  }
}

export class LeftNav extends Component {
  render () {
    return (
      <MULeftNav
        ref='leftNav'
        style={style.nav}
        width={75}
      >
        <ListItem
          key={0}
          leftAvatar={
            <Avatar
              icon={<ActionHome />}
            />
          }
          primaryText='&nbsp;'
          onTouchTap={() => (window.location = '#/home')}
        />
        <ListItem
          key={2}
          leftAvatar={
            <Avatar
              icon={<ActionSearch />}
            />
          }
          primaryText='&nbsp;'
          onTouchTap={() => (window.location = '#/search')}
        />
        <ListItem
          key={3}
          leftAvatar={
            <Avatar
              icon={<ActionAssessment />}
            />
          }
          primaryText='&nbsp;'
          onTouchTap={() => (window.location = '#/analytics')}
        />
        <ListItem
          key={1}
          leftAvatar={
            <Avatar
              icon={<FileFolder />}
            />
          }
          primaryText='&nbsp;'
          onTouchTap={() => (window.location = '#/data')}
        />
        <ListItem
          key={4}
          leftAvatar={
            <Avatar
              icon={<ActionSettings />}
            />
          }
          primaryText='&nbsp;'
          onTouchTap={() => (window.location = '#/settings')}
        />
      </MULeftNav>
    )
  }
}