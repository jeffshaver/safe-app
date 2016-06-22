import ActionAssessment from 'material-ui/svg-icons/action/assessment'
import ActionDashboard from 'material-ui/svg-icons/action/dashboard'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import Analytics from './components/Analytics'
import Dashboard from './components/Dashboard'
import Dashboards from './components/Dashboards'
import {disabledRoutes} from '../../config'
import FileFolder from 'material-ui/svg-icons/file/folder'
import Search from './components/Search'
import Settings from './components/Settings'
import Upload from './components/Upload'

const isRouteEnabled = (name) => (
  disabledRoutes.indexOf(name) === -1
)

export const routes = [{
  avatar: ActionDashboard,
  component: Dashboards,
  enabled: isRouteEnabled('Dashboards'),
  name: 'Dashboards',
  path: 'dashboards',
  subRoutes: [{
    component: Dashboard,
    enabled: isRouteEnabled('Dashboard'),
    name: 'Dashboard',
    path: ':dashboardId'
  }]
}, {
  avatar: ActionSearch,
  component: Search,
  enabled: isRouteEnabled('Search'),
  name: 'Search',
  path: 'search'
}, {
  avatar: ActionAssessment,
  component: Analytics,
  enabled: isRouteEnabled('Analytics'),
  name: 'Analytics',
  path: 'analytics'
}, {
  avatar: FileFolder,
  component: Upload,
  enabled: isRouteEnabled('Upload'),
  name: 'Upload',
  path: 'upload'
}, {
  avatar: ActionSettings,
  component: Settings,
  enabled: isRouteEnabled('Settings'),
  name: 'Settings',
  path: 'settings'
}]

export const getDashboardById = (dashboards, id) => {
  let dashboard

  dashboards.forEach((currentDashboard) => {
    if (currentDashboard._id !== id) {
      return
    }

    dashboard = currentDashboard
  })

  return dashboard
}