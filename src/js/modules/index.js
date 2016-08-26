import analytics from './analytics'
import category from './category'
import {combineReducers} from 'redux'
import createDashboardDialog from './create-dashboard-dialog'
import dashboardGroups from './dashboard-groups'
import dashboards from './dashboards'
import deleteDashboardDialog from './delete-dashboard-dialog'
import dialog from './dialog'
import editDashboardDialog from './edit-dashboard-dialog'
import fetchCreateDashboard from './create-dashboard'
import fetchDeleteDashboard from './delete-dashboard'
import fetchEditDashboard from './edit-dashboard'
import fields from './fields'
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
import visualizationTypes from './visualization-types'
import analytic, {
  HYDRATE as HYDRATE_ANALYTIC,
  hydrateAnalytic
} from './analytic'
import filters, {
  HYDRATE as HYDRATE_FILTERS,
  hydrateFilters
} from './filters'
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
  hydrateFilters,
  hydrateSource,
  hydrateVisualization
}

export const rootReducer = combineReducers({
  analytic: hydrateable(analytic, HYDRATE_ANALYTIC),
  analytics,
  category,
  createDashboard: fetchCreateDashboard,
  createDashboardDialog,
  dashboardGroups,
  dashboards,
  deleteDashboard: fetchDeleteDashboard,
  deleteDashboardDialog,
  dialog,
  editDashboard: fetchEditDashboard,
  editDashboardDialog,
  fields,
  filters: hydrateable(filters, HYDRATE_FILTERS),
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
  visualizationTypes,

  // for react-router-redux
  routing
})