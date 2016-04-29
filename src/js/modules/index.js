import analytics from './analytics'
import category from './category'
import {combineReducers} from 'redux'
import createDashboardDialog from './create-dashboard-dialog'
import dashboard from './dashboard'
import dashboards from './dashboards'
import deleteDashboardDialog from './delete-dashboard-dialog'
import dialog from './dialog'
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
import uploadDataTypes from './upload'
import user from './user'
import visualizations from './visualization-types'
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
  createDashboardDialog,
  dashboard,
  dashboards,
  deleteDashboardDialog,
  dialog,
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
  uploadDataTypes,
  user,
  visualization: hydrateable(visualization, HYDRATE_VISUALIZATION),
  visualizations,

  // for react-router-redux
  routing
})