import ActionAssessment from 'material-ui/svg-icons/action/assessment'
import ActionDashboard from 'material-ui/svg-icons/action/dashboard'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import Analytics from './components/Analytics'
import Dashboard from './components/Dashboard'
import Dashboards from './components/Dashboards'
import {disabledRoutes} from '../../config'
import FileFolder from 'material-ui/svg-icons/file/folder'
import {Home} from './components/Home'
import Search from './components/Search'
import Settings from './components/Settings'
import Upload from './components/Upload'

const isRouteEnabled = (name) => (
  disabledRoutes.indexOf(name) === -1
)

export const routes = {
  'Home': {
    component: Home,
    enabled: isRouteEnabled('Home'),
    path: '/'
  },
  Dashboards: {
    avatar: ActionDashboard,
    component: Dashboards,
    enabled: isRouteEnabled('Dashboards'),
    path: 'dashboards',
    subRoutes: {
      Dashboard: {
        component: Dashboard,
        enabled: isRouteEnabled('Dashboard'),
        path: ':dashboardId'
      }
    }
  },
  Search: {
    avatar: ActionSearch,
    component: Search,
    enabled: isRouteEnabled('Search'),
    path: 'search'
  },
  Analytics: {
    avatar: ActionAssessment,
    component: Analytics,
    enabled: isRouteEnabled('Analytics'),
    path: 'analytics'
  },
  Upload: {
    avatar: FileFolder,
    component: Upload,
    enabled: isRouteEnabled('Upload'),
    path: 'upload'
  },
  Settings: {
    avatar: ActionSettings,
    component: Settings,
    enabled: isRouteEnabled('Settings'),
    path: 'settings'
  }
}

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