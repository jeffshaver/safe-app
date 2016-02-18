import Radium, {Style} from 'radium'
import React, {Component, PropTypes} from 'react'
import {AppBar, AppCanvas, Avatar, LeftNav, ListItem} from 'material-ui'
import {large} from '../styles/mediaQueries'
// import {DefaultAreaChart, DefaultColumnChart, DefaultLineChart} from 'safe-framework'
//SVG
import ActionAssessment from 'material-ui/lib/svg-icons/action/assessment'
import ActionHome from 'material-ui/lib/svg-icons/action/home'
import ActionSearch from 'material-ui/lib/svg-icons/action/search'
import ActionSettings from 'material-ui/lib/svg-icons/action/settings'
import FileFolder from 'material-ui/lib/svg-icons/file/folder'

const style = {
  nav: {
    margin: '64px 0 0px 0',
    padding: '10px 0 0 0'
  },
  padding: '74px 0 0 0',
  wrapper: {
    padding: '64px 0 0 100px',
    [large]: {
      padding: '64px 0 0 100px'
    }
  }
}

@Radium
class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  
  render () {
    const {children} = this.props
    
    return (
      <AppCanvas>
        <Style rules={{
          body: {
            fontFamily: 'Roboto, sans-serif'
          },
          'body *': {
            fontFamily: 'inherit'
          }
        }}/>
        <AppBar
          showMenuIconButton = {false}
          title = "SAFE"
          zDepth = {1}
        />
        <LeftNav
          ref='leftNav'
          style={style.nav}
          width={75}
        >
          <ListItem
            key={0}
            primaryText="&nbsp;"
            leftAvatar={
              <Avatar
                icon={<ActionHome />}
              />
            } 
            onTouchTap={() => window.location = '#/home'}
          />          
       
          <ListItem
            key={2}
            primaryText="&nbsp;"
            leftAvatar={
              <Avatar
                icon={<ActionSearch />}
              />
            }
            onTouchTap={() => window.location = '#/search'}
          />          
          <ListItem
            key={3}
            primaryText="&nbsp;"
            leftAvatar={
              <Avatar
                icon={<ActionAssessment />}
              />
            }
            onTouchTap={() => window.location = '#/analytics'}
          />
          <ListItem
            key={1}
            primaryText="&nbsp;"
            leftAvatar={
              <Avatar
                icon={<FileFolder />}
              />
            }
            onTouchTap={() => window.location = '#/data'}
          />   
          <ListItem
            key={4}
            primaryText="&nbsp;"
            leftAvatar={
              <Avatar
                icon={<ActionSettings />}
              />
            }
            onTouchTap={() => window.location = '#/settings'}
          />          
       </LeftNav>
        <div style={style.wrapper}>
          {children}
        </div>
      </AppCanvas>
    )
  }
}

export default /* connect() */(App)