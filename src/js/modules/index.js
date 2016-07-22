import alerts from './alerts'
import analytics from './analytics'
import category from './category'
import {combineReducers} from 'redux'
import dashboardGroups from './dashboard-groups'
import dashboardMenus from './dashboard-menus'
import dashboards from './dashboards'
import dialog from './dialog'
import fields from './fields'
import filters from './filters'
import hydrateable from './hydrateable'
import label from './label'
import latitude from './latitude'
import longitude from './longitude'
import mapResults from './map-results'
import metrics from './metrics'
import {routerReducer as routing} from 'react-router-redux'
import searchResults from './search-results'
import sources from './sources'
import uploadDataTypes from './upload'
import user from './user'
import visualizationResults from './visualization-results'
import visualizations from './visualizations'
import visualizationTypes from './visualization-types'
import analytic, {
  HYDRATE as HYDRATE_ANALYTIC,
  hydrateAnalytic
} from './analytic'
import dashboard, {
  createDashboard,
  deleteDashboard,
  editDashboard
} from './dashboard'
import source, {
  HYDRATE as HYDRATE_SOURCE,
  hydrateSource
} from './source'
import visualization, {
  HYDRATE as HYDRATE_VISUALIZATION,
  hydrateVisualization
} from './visualization'

export const actions = {
  hydrateAnalytic,
  hydrateSource,
  hydrateVisualization
}

export const rootReducer = combineReducers({
  alerts,
  analytic: hydrateable(analytic, HYDRATE_ANALYTIC),
  analytics,
  category,
  createDashboard,
  dashboardMenus,
  dashboard,
  dashboardGroups,
  dashboards,
  deleteDashboard,
  dialog,
  editDashboard,
  fields,
  filters,
  label,
  latitude,
  longitude,
  mapResults,
  metrics,
  searchResults,
  source: hydrateable(source, HYDRATE_SOURCE),
  sources,
  uploadDataTypes,
  user,
  visualization: hydrateable(visualization, HYDRATE_VISUALIZATION),
  visualizationResults,
  visualizations,
  visualizationTypes,

  // for react-router-redux
  routing
})