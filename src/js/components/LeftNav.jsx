import React, {Component} from 'react'
import {Avatar, LeftNav as MULeftNav, ListItem} from 'material-ui'
import Divider from 'material-ui/lib/divider'
import {browserHistory} from 'react-router'
// SVG
import ActionAssessment from 'material-ui/lib/svg-icons/action/assessment'
import ActionSearch from 'material-ui/lib/svg-icons/action/search'
import ActionSettings from 'material-ui/lib/svg-icons/action/settings'
import FileFolder from 'material-ui/lib/svg-icons/file/folder'

export class LeftNav extends Component {
  render () {
    return (
      <MULeftNav
        ref='leftNav'
        width={175}
      >
        <ListItem
          key={6}
          onTouchTap={() => (browserHistory.push('/'))}
        >
          <h1>SAFE</h1>
        </ListItem>
        <Divider />
        <ListItem
          key={1}
          leftAvatar={
            <Avatar
              icon={<ActionSearch />}
            />
          }
          onTouchTap={() => (browserHistory.push('/search'))}
        >
          Search
        </ListItem>
        <ListItem
          key={2}
          leftAvatar={
            <Avatar
              icon={<ActionAssessment />}
            />
          }
          onTouchTap={() => (browserHistory.push('/analytics'))}
        >
          Analytics
        </ListItem>
        <ListItem
          key={3}
          leftAvatar={
            <Avatar
              icon={<FileFolder />}
            />
          }
          onTouchTap={() => (browserHistory.push('/upload'))}
        >
          Upload
        </ListItem>
        <ListItem
          key={4}
          leftAvatar={
            <Avatar
              icon={<ActionSettings />}
            />
          }
          onTouchTap={() => (browserHistory.push('/settings'))}
        >
          Settings
        </ListItem>
      </MULeftNav>
    )
  }
}