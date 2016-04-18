import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import analytic, {
  HYDRATE as HYDRATE_ANALYTIC,
  hydrateAnalytic
} from './analytic'
import analytics from './analytics'
import dialog from './dialog'
import fields from './fields'
import filters, {
  HYDRATE as HYDRATE_FILTERS,
  hydrateFilters
} from './filters'
import hydrateable from './hydrateable'
import searchResults from './search-results'
import source, {
  HYDRATE as HYDRATE_SOURCE,
  hydrateSource
} from './source'
import sources from './sources'
import uploadDataTypes from './upload'
import user from './user'
import visualization, {
  HYDRATE as HYDRATE_VISUALIZATION,
  hydrateVisualization
} from './visualization'
import visualizations from './visualizations'

export const actions = {
  hydrateAnalytic,
  hydrateFilters,
  hydrateSource,
  hydrateVisualization
}

export const rootReducer = combineReducers({
  analytic: hydrateable(analytic, HYDRATE_ANALYTIC),
  analytics,
  dialog,
  fields,
  filters: hydrateable(filters, HYDRATE_FILTERS),
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