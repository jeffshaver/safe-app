import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import analytic from './analytic'
import analytics from './analytics'
import dialog from './dialog'
import fields from './fields'
import filters from './filters'
import hydrateable from './hydrateable'
import searchResults from './search-results'
import source from './source'
import sources from './sources'
import uploadDataTypes from './upload-data-types'
import user from './user'
import visualization from './visualization'
import visualizations from './visualizations'
import {
  HYDRATE_ANALYTIC,
  HYDRATE_FILTERS,
  HYDRATE_SOURCE,
  HYDRATE_VISUALIZATION
} from '../action-types'

export {analytic}
export {analytics}
export {dialog}
export {fields}
export {filters}
export {hydrateable}
export {searchResults}
export {source}
export {sources}
export {uploadDataTypes}
export {user}
export {visualization}
export {visualizations}

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