import analytics from './analytics'
import category from './category'
import {combineReducers} from 'redux'
import createDashboard from './create-dashboard'
import createDashboardDialog from './create-dashboard-dialog'
import createSource from './create-source'
import dashboard from './dashboard'
import dashboards from './dashboards'
import deleteDashboard from './delete-dashboard'
import deleteDashboardDialog from './delete-dashboard-dialog'
import dialog from './dialog'
import editDashboard from './edit-dashboard'
import editDashboardDialog from './edit-dashboard-dialog'
import fields from './fields'
import hydrateable from './hydrateable'
import label from './label'
import latitude from './latitude'
import longitude from './longitude'
import mapResults from './map-results'
import {routerReducer as routing} from 'react-router-redux'
import searchResults from './search-results'
import sources from './sources'
import uploadData from './upload-data'
import uploadDataTypes from './upload-data-types'
import uploads from './uploads'
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
  createDashboard,
  createDashboardDialog,
  createSource,
  dashboard,
  dashboards,
  deleteDashboard,
  deleteDashboardDialog,
  dialog,
  editDashboard,
  editDashboardDialog,
  fields,
  filters: hydrateable(filters, HYDRATE_FILTERS),
  label,
  latitude,
  longitude,
  mapResults,
  searchResults,
  source: hydrateable(source, HYDRATE_SOURCE),
  sources,
  uploadData,
  uploadDataTypes,
  uploads,
  user,
  visualization: hydrateable(visualization, HYDRATE_VISUALIZATION),
  visualizationResults,
  visualizationTypes,

  // for react-router-redux
  routing
})